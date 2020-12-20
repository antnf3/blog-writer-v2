import { write } from "clipboardy";
import * as puppeteer from "puppeteer";
import { NAVER } from "./constants";

/**
 * getBrowser
 * @param N/A
 * @return browser: Promise<puppeteer.Browser>
 */
async function getBrowser(id: string): Promise<puppeteer.Browser> {
  // const hostType = process.env.HOSTTYPE || "";

  const options = {
    devtools: false,
    headless: false,
    userDataDir: `usrdata/${id}`,
    defaultViewport: { width: 1920, height: 1080 },
    args: ["--start-maximized"],
  };

  const browser: puppeteer.Browser = await puppeteer.launch(options);
  return browser;
}

/**
 * getPage
 * @param browser: puppeteer.Browser
 * @return page: Promise<puppeteer.Page>
 */
async function getPage(browser: puppeteer.Browser): Promise<puppeteer.Page> {
  try {
    const page = await browser.newPage();
    // await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(
      "`user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
    );
    return page;
  } catch (err) {
    console.log(err);
    throw `getPage error`;
  }
}

/**
 * naverLogin
 * @param page: puppeteer.Page
 * @return Promise<void>
 */
async function naverLogin(
  page: puppeteer.Page,
  id: string,
  pwd: string
): Promise<void> {
  try {
    await page.goto(NAVER.LOGIN_URL, { waitUntil: `networkidle2` });
    await page.waitForTimeout(getRandom());
    await setCopyNpaste(page, NAVER.ID_ELE, id); // enter id
    await setCopyNpaste(page, NAVER.PWD_ELE, pwd); // enter pwd
    await clickElement(page, NAVER.LOGIN_BTN_ELE); // click login button

    const arrElement = await page.$x(NAVER.ALWAYS_SAVE_BTN_ELE);
    if (arrElement.length > 0) {
      await arrElement[0].click();
      await page.waitForTimeout(getRandom());
    }
  } catch (err) {
    throw err;
  }
}

/**
 * random 숫자를 가져온다.(1000단위)
 * @param milliseconds: number
 * @return number
 */
function getRandom(milliseconds?: number): number {
  milliseconds = milliseconds || 0;
  let random = Math.floor(Math.random() * 2000);
  if (random < 1000) {
    random = random + 1000;
  }
  return random + milliseconds;
}

/**
 * copy and paste
 * @param page: puppeteer.Page
 * @param eleId: string
 * @param text: string
 * @return Promise<void>
 */
async function setCopyNpaste(
  page: puppeteer.Page,
  eleId: string,
  text: string,
  frame?: puppeteer.Frame
): Promise<void> {
  try {
    await write(text);
    frame ? await clickElement(frame, eleId) : await clickElement(page, eleId);
    await page.keyboard.down("Control");
    await page.keyboard.press("v", { delay: getRandom() });
    await page.keyboard.up("Control");
    await page.waitForTimeout(getRandom());
  } catch (err) {
    console.log(err);
    throw `setCopyNpaste error - eleId: ${eleId}`;
  }
}

/**
 * control 조합키 이벤트 발생
 * @param page: puppeteer.Page
 * @param sendKey: string
 * @return Promise<void>
 */
async function setControlKey(page: puppeteer.Page, sendKey: string) {
  try {
    await page.keyboard.down("Control");
    await page.keyboard.press(sendKey, { delay: getRandom() });
    await page.keyboard.up("Control");
    await page.waitForTimeout(getRandom());
  } catch (err) {
    throw `setControlKey error: ${err}`;
  }
}
/**
 * keyPress
 * @param page: puppeteer.Page
 * @param keyName: string
 * @return Promise<void>
 */
async function keyPress(page: puppeteer.Page, keyName: string): Promise<void> {
  try {
    await page.keyboard.down(keyName);
    await page.keyboard.up(keyName);
    await page.waitForTimeout(getRandom());
  } catch (err) {
    console.log(err);
    throw `keyPress error - keyName: ${keyName}`;
  }
}

/**
 * clickElement
 * @param page: puppeteer.Page
 * @param eleId: string
 * @return Promise<void>
 */
async function clickElement(
  page: puppeteer.Page | puppeteer.Frame,
  eleId: string
): Promise<void> {
  try {
    // const arrElement = await page.$x(eleId);
    // await arrElement[0].click();
    const element = await page.waitForXPath(eleId);
    await element.click();
    await page.waitForTimeout(getRandom());
  } catch (err) {
    console.log(err);
    throw `buttonClick error - eleId: ${eleId}`;
  }
}

/**
 * get Last Tab
 * @param browser: puppeteer.Browser
 * @return Promise<puppeteer.Page>
 */
async function moveLastTab(browser: puppeteer.Browser) {
  try {
    const pages: puppeteer.Page[] = await browser.pages();
    return pages[pages.length - 1];
  } catch (err) {
    throw `moveLastTab error ${err}`;
  }
}

/**
 * move Main Frame
 * @param page: puppeteer.Page
 * @param frameName: string
 * @return mainFrame: puppeteer.Frame | undefined
 */
function moveMainFrame(page: puppeteer.Page, frameName: string) {
  let mainFrame: puppeteer.Frame | undefined;
  try {
    mainFrame = page.frames().find((frame) => frame.name() === frameName); // iframe
  } catch (err) {
    throw `moveMainFrame error ${err}`;
  }
  return mainFrame;
}

/**
 * select box
 * @param page: puppeteer.Page | puppeteer.Frame
 * @param xpathString: string
 * @return Promise<void>
 */
async function setSelectBox(
  mainFrame: puppeteer.Frame,
  selectBoxXpath: string,
  value: string
) {
  try {
    await clickElement(mainFrame, selectBoxXpath);
    // const selectBox = await page.waitForXPath(xpathString);
    // selectBox.type(value);
    await mainFrame.select(`select[name="${NAVER.SELECT_TYPE_NAME}"]`, value);
    await mainFrame.waitForTimeout(getRandom());
  } catch (err) {
    throw `setSelectBox error ${err}`;
  }
}

/**
 * upload multi image
 */
async function uploadMultiImages(
  page: puppeteer.Page | puppeteer.Frame,
  imgUrl: string[],
  browser: puppeteer.Browser
): Promise<string[] | undefined> {
  let arrImgTags: string[] = [];
  try {
    for (let i = 0; i < imgUrl.length; i++) {
      await clickElement(page, NAVER.ATTACH_FILE_BTN_ELE); // 사진 업로드 버튼 클릭
      await page.waitForTimeout(getRandom(2000));

      const fileUploadPage = await moveLastTab(browser); // 파일업로드 팝업 page
      await fileUploadPage.waitForTimeout(getRandom(2000));
      // await fileUploadPage.waitForTimeout(getRandom());
      const isNotHidden = await fileUploadPage.$eval(
        NAVER.NEXT_VIEW_BTN_SEL,
        (elem: any) => {
          return elem.style.display !== "none";
        }
      );

      if (isNotHidden) {
        await clickElement(fileUploadPage, NAVER.NEXT_VIEW_BTN_ELE);
      }

      const inputUploadHandle = await fileUploadPage.$(NAVER.IMG_FILE_TAG_ELE);
      inputUploadHandle && (await inputUploadHandle.uploadFile(imgUrl[i])); // 첨부파일 이미지 선택

      await fileUploadPage.waitForTimeout(getRandom(3000));
      await clickElement(fileUploadPage, NAVER.IMG_UPLOAD_BTN_ELE); // 업로드버튼 클릭

      await clickElement(page, NAVER.EDIT_HTML_BTN_ELE); // html 입력창으로 이동
      await clickElement(page, NAVER.HTML_TEXTAREA_ELE); // html textArea 클릭

      // html textarea 값 가져오기
      const htmlTextAreaValue = await page.$eval(
        NAVER.HTML_TEXT_AREA_SEL,
        (textArea: any) => {
          return textArea.value;
        }
      );
      arrImgTags.push(htmlTextAreaValue);
      // html textarea 클리어
      await page.$eval(NAVER.HTML_TEXT_AREA_SEL, (textArea: any) => {
        textArea.value = "";
      });

      await clickElement(page, NAVER.EDITOR_BTN_ELE); // Editor 입력창으로 이동
      return arrImgTags;
    }
  } catch (err) {
    throw `uploadMultiImages error ${err}`;
  }
}

/**
 * random 숫자 가져오기
 * @param arrBase: number[]
 * @return {rdNum, imoticonUnit}:{number, number}
 */
function getRandomRd(arrBase: number[]) {
  const rd: number = Math.floor(Math.random() * 10) % arrBase.length;
  const rdNum: number = arrBase.splice(rd, 1)[0];
  const imoticonUnit: number = Math.floor(Math.random() * 5);
  return { rdNum, imoticonUnit };
}

/**
 * rocket delivery 변환
 * @param page: puppeteer.Page,
 * @param mainFrame: puppeteer.Frame,
 * @param target: string
 * @return Promise<void>
 */
async function setImoticon_V3(
  page: puppeteer.Page,
  mainFrame: puppeteer.Frame,
  target: string
) {
  const arrBase = [0, 1, 2, 3, 4, 5];
  const { rdNum, imoticonUnit } = getRandomRd(arrBase);
  await write(target);
  await page.waitForTimeout(getRandom());
  await setControlKey(page, "f");
  await setControlKey(page, "v");

  await clickElement(mainFrame, NAVER.NEXT_SEARCH_BTN_ELE); // 다음찾기 버튼 클릭
  await keyPress(page, "Enter");
  await keyPress(page, "Enter");
  await keyPress(page, "ArrowUp");
  await clickElement(mainFrame, NAVER.CLOSE_SEARCH_BTN_ELE); // 검색창 닫기 버튼 클릭

  await selectImoticon(mainFrame, rdNum, imoticonUnit);
}

/**
 * review 변환
 * @param page: puppeteer.Page,
 * @param mainFrame: puppeteer.Frame,
 * @param reviewCnt: number
 * @return Promise<void>
 */
async function setImoticon_V2(
  page: puppeteer.Page,
  mainFrame: puppeteer.Frame,
  reviewCnt: number
) {
  const nextSearchBtn = `//*[@id="se2_tool"]/div[2]/ul[6]/li[5]/div/div/div/div[1]/p/button[1]`;
  const closeSearchBtn = `//*[@id="se2_tool"]/div[2]/ul[6]/li[5]/div/div/div/button[2]`;

  const arrBase = [0, 1, 2, 3, 4, 5];
  for (let i = 0; i < reviewCnt; i++) {
    const rd = Math.floor(Math.random() * 10) % arrBase.length;
    const imoticonUnit = Math.floor(Math.random() * 5);
    const rdNum = arrBase.splice(rd, 1)[0];

    await write(`$review${i}$`);
    await setControlKey(page, "f");
    await setControlKey(page, "v");

    await clickElement(mainFrame, nextSearchBtn); // 다음찾기 버튼 클릭

    await keyPress(page, "Enter");
    await keyPress(page, "Enter");
    await keyPress(page, "ArrowUp");

    await clickElement(mainFrame, closeSearchBtn); // 검색창 닫기 버튼 클릭

    await selectImoticon(mainFrame, rdNum, imoticonUnit);
  }
}
/**
 * 이모티콘 선택
 * @param mainFrame: puppeteer.Frame
 * @param rdNum: number,
 * @param imoticonUnit: number
 * @return Promise<void>
 */
async function selectImoticon(
  mainFrame: puppeteer.Frame,
  rdNum: number,
  imoticonUnit: number
) {
  await clickElement(mainFrame, NAVER.CENTER_BTN_ELE); // 가운데 정렬
  await clickElement(mainFrame, NAVER.IMOJI_BTN_ELE); // 스티커(이모티콘) 버튼 클릭
  await clickElement(mainFrame, NAVER.ARR_IMOJI_MENUS[rdNum]); // 이모티콘 메뉴
  const imoticon = rdNum * 5 + imoticonUnit;
  await clickElement(mainFrame, NAVER.ARR_IMOJI_ITEMS[imoticon]); // 이모티콘 선택
}
export {
  getBrowser,
  getPage,
  naverLogin,
  getRandom,
  setCopyNpaste,
  keyPress,
  clickElement,
  moveLastTab,
  moveMainFrame,
  setSelectBox,
  uploadMultiImages,
  setImoticon_V3,
  setImoticon_V2,
};
