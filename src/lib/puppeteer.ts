import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const getExecutablePath = async () => {
  if (process.env.NODE_ENV === 'development') {
    return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  }
  return await chromium.executablePath();
};

export const getBrowser = async () => {
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await getExecutablePath(),
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
  });
};
