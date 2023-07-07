// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
    channel: "chrome",
  });

  try {
    const page = await browser.newPage();
    await page.goto(String(url));

    // load end

    const image = await page.screenshot({ type: "png" });

    res.status(200).send(image);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
