const express = require("express")
const Apify = require("apify")
const puppeteer = require("puppeteer")
const fs = require("fs")
const app = express()
const port = 4999

// const url = "https://www.theguardian.com/uk"
const url = "https://www.etf.com/"
const bin = "http://httpbin.org/cookies/set?a=1&b=2"

const getData = async () => {
	try {
		const browser = await Apify.launchPuppeteer({ stealth: true })
		const page = await browser.newPage()

		await page.goto(url)
		// await page.waitForNavigation()
		const cookies = await page.cookies()
		console.log("the cookies", cookies)
		const page2 = await browser.newPage()
		await page2.setCookie(...cookies)
		await page2.goto(url)

		const data = await page2.$eval("tbody", (el) => el.innerText)

		console.log(data)

		await browser.close()
	} catch (error) {
		console.log(error)
	}
}

getData()
let etfList = []

app.listen(port, () => console.log(`YOU ARE CONNECTED TO ${port}`))
