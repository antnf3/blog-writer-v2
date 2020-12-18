import "dotenv/config";
import * as puppeteer from "puppeteer";
import { NAVER } from "./constants";
import {
  clickElement,
  getBrowser,
  getPage,
  moveLastTab,
  moveMainFrame,
  naverLogin,
  setCopyNpaste,
  setImoticon_V2,
  setImoticon_V3,
  setSelectBox,
  uploadMultiImages,
} from "./utils";

/**
 * 내용 속성
 */
interface contentProps {
  ctnt1: string;
  ctnt2: string;
  ctnt3: string;
  reviewCnt: number;
}
interface WriteNaverPostProps {
  id: string;
  password: string;
  imgUrl: string[];
  subject: string;
  content: contentProps;
  selectType: string;
  tags: string;
  site: string;
}

async function writeNaverPost(obj: WriteNaverPostProps) {
  type browserType = puppeteer.Browser | null;
  let browser: browserType = null;
  try {
    browser = await getBrowser(obj.id);
    const page = await getPage(browser);
    await naverLogin(page, obj.id, obj.password); // 네이버 로그인
    await clickElement(page, NAVER.BLOG_TAB_BTN_ELE); // 블로그 탭 클릭
    await clickElement(page, NAVER.WRITE_BTN_ELE); // 글쓰기 버튼 클릭

    const lastPage: puppeteer.Page = await moveLastTab(browser); // 마지막 탭화면 가져오기
    const mainFrame = moveMainFrame(lastPage, "mainFrame"); // main frame 이동
    if (mainFrame) {
      await setSelectBox(mainFrame, NAVER.SELECT_TYPE_ELE, obj.selectType); // select box 선택
      await setCopyNpaste(lastPage, NAVER.SUBJECT_ELE, obj.subject, mainFrame); // 제목 입력

      const arrImgTags = await uploadMultiImages(
        mainFrame,
        obj.imgUrl,
        browser
      );
      // console.log(arrImgTags);
      await clickElement(mainFrame, NAVER.EDIT_HTML_BTN_ELE); // html 입력창으로 이동
      if (arrImgTags) {
        const [mainImg, ...othersImg] = arrImgTags;

        await setCopyNpaste(
          lastPage,
          NAVER.HTML_TEXTAREA_ELE,
          `${mainImg} ${
            obj.content.ctnt1 +
            obj.content.ctnt2 +
            othersImg.join("") +
            obj.content.ctnt3
          }`,
          mainFrame
        ); // html 내용입력

        await clickElement(mainFrame, NAVER.EDITOR_BTN_ELE); // Editor 입력창으로 이동

        await setImoticon_V3(lastPage, mainFrame, `$rocket_delivery$`);
        await setImoticon_V2(lastPage, mainFrame, obj.content.reviewCnt);
        await clickElement(mainFrame, NAVER.SUBJECT_COMBO_ELE); // 주제분류 콤보클릭
        await clickElement(mainFrame, NAVER.SUBJECT_TYPE); // 상품리뷰 라디오버튼

        await setCopyNpaste(lastPage, NAVER.TAGS_ELE, obj.tags, mainFrame); // 태그 입력

        await clickElement(mainFrame, NAVER.SAVE_BTN_ELE); // 발행
        await browser.close();
      }
    }
  } catch (err) {
    console.log(err);
    if (browser) {
      await browser.close();
    }
    throw err;
  }
}

// const param = {
//   id: `${process.env.NAVER_ID}`,
//   password: `${process.env.NAVER_PWD}`,
//   imgUrl: [`C:/Users/antnf/Desktop/캡처4.PNG`],
//   subject: "베베숲 라이트 아기물티슈 캡형, 80매, 10개",
//   content: {
//     ctnt1: `ctnt1`,
//     ctnt2: "ctnt2",
//     ctnt3: `내용입니다. 니여랜열닝런열ㄴㅇ
//     $rocket_delivery$
//     ㅇㄴ
//     $review0$
//     ㄹㄴ일ㄴ이런ㅇㄹ

//     ㄴ이러닝러니

//     ㄹㄴ일ㄴ이런ㅇㄹ

//     ㄴ이러닝러니
//     ㄹㄴ일ㄴ이런ㅇㄹ

//     ㄴ이러닝러니
//     ㄹㄴ일ㄴ이런ㅇㄹ

//     ㄴ이러닝러니
//     ㄹㄴ일ㄴ이런ㅇㄹ

//     ㄴ이러닝러니
//     `,
//     reviewCnt: 1,
//   },
//   selectType: "7",
//   tags: `#학교, #하교, #등교`,
//   site: `naver`,
// };
// writeNaverPost(param);

export { writeNaverPost };
