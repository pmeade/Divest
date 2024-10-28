const { exec } = require('child_process');
const path = require('path');

describe('NAT Traversal Server', function() {
    this.timeout(10000); // Increase timeout for Puppeteer

    let serverProcess;
    let browser;

    before((done) => {
        // Start the NAT traversal server
        serverProcess = exec('node server/nat_server.cjs', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        // Wait for the server to start
        setTimeout(done, 2000);
    });

    after(() => {
        // Close the server process
        serverProcess.kill();
    });

    beforeEach(async () => {
        // Dynamically import puppeteer and chai
        const puppeteer = await import('puppeteer');
        const { expect } = await import('chai');

        // Launch a new browser instance
        browser = await puppeteer.default.launch();
    });

    afterEach(async () => {
        // Close the browser instance
        await browser.close();
    });

    it('should connect two peers and exchange messages', async () => {
        const peer1HtmlPath = path.resolve(__dirname, '../webapp/peer1.html');
        const peer2HtmlPath = path.resolve(__dirname, '../webapp/peer2.html');

        const peer1Page = await browser.newPage();
        const peer2Page = await browser.newPage();

        await peer1Page.goto(`file://${peer1HtmlPath}`);
        await peer2Page.goto(`file://${peer2HtmlPath}`);

        // Simulate clicking the connect button on peer1
        await peer1Page.click('#connect');

        // Wait for the message to be received by peer2
        const message = await peer2Page.evaluate(() => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    const log = document.querySelector('body').innerText;
                    if (log.includes('Received from Peer 1: Hello from Peer 1')) {
                        clearInterval(interval);
                        resolve('Received from Peer 1: Hello from Peer 1');
                    }
                }, 100);
            });
        });

        expect(message).to.equal('Received from Peer 1: Hello from Peer 1');
    });
});