const NAVER = {
  LOGIN_URL: `https://nid.naver.com/nidlogin.login`,
  ID_ELE: `//*[@id="id"]`,
  PWD_ELE: `//*[@id="pw"]`,
  LOGIN_BTN_ELE: `//*[@id="log.login"]`,
  DONT_SAVE_BTN_ELE: `//*[@id="new.dontsave"]`,
  ALWAYS_SAVE_BTN_ELE: `//*[@id="new.save"]`,
  BLOG_TAB_BTN_ELE: `//*[@id="NM_FAVORITE"]/div[1]/ul[1]/li[3]/a`, // 네이버 메인화면의 블로그탭
  WRITE_BTN_ELE: `//*[@id="container"]/div/aside/div/div[1]/nav/a[2]`, // 글쓰기버튼
  MAIN_FRAME_ELE: `//*[@id="mainFrame"]`, // 메인 iframe
  SELECT_TYPE_ELE: `//*[@id="post.category.categoryNo"]`, // 게시판 선택
  SELECT_TYPE_NAME: `post.category.categoryNo`, // 게시판 선택 select name
  SUBJECT_ELE: `//*[@id="subject"]`, // 제목
  ATTACH_FILE_BTN_ELE: `//*[@id="se2_tool"]/div[1]/ul[1]/li[1]/button/span[1]`, // 사진첨부버튼
  NEXT_VIEW_BTN_ELE: `/html/body/div[2]/div/button`, // 파일업로드 메시지 팝업 X 버튼
  NEXT_VIEW_BTN_SEL: `body > div.npe_alert_wrap.on > div > button`, // 파일업로드 메시지 팝업 X 버튼
  IMG_FILE_TAG_ELE: `#pc_image_file`, // 이미지 파일 업로드 태그
  IMG_UPLOAD_BTN_ELE: `/html/body/div[3]/header/div[2]/button`, // 이미지파일 업로드 버튼
  EDIT_HTML_BTN_ELE: `//*[@id="smart_editor2_content"]/div[5]/ul/li[2]/button`, // html 입력버튼
  HTML_TEXTAREA_ELE: `//*[@id="smart_editor2_content"]/div[4]/textarea[1]`, // html textarea
  HTML_TEXT_AREA_SEL: `#smart_editor2_content > div.se2_input_area.husky_seditor_editing_area_container > textarea.se2_input_syntax.se2_input_htmlsrc`,
  EDITOR_BTN_ELE: `//*[@id="smart_editor2_content"]/div[5]/ul/li[1]/button`, // editor 입력버튼
  NEXT_SEARCH_BTN_ELE: `//*[@id="se2_tool"]/div[2]/ul[6]/li[5]/div/div/div/div[1]/p/button[1]`, // 검색창 찾기버튼
  CLOSE_SEARCH_BTN_ELE: `//*[@id="se2_tool"]/div[2]/ul[6]/li[5]/div/div/div/button[2]`, // 검색창닫기버튼
  IMOJI_BTN_ELE: `//*[@id="se2_tool"]/div[2]/ul[7]/li/button`,
  CENTER_BTN_ELE: `//*[@id="se2_tool"]/div[2]/ul[3]/li[2]/button`, // 가운데 정렬
  ARR_IMOJI_MENUS: [
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[1]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[2]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[3]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[4]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[5]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[6]/button`,
  ], // 이모지 메뉴
  ARR_IMOJI_ITEMS: [
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[1]/div/ul/li[1]/button`,
    '//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[1]/div/ul/li[2]/button',
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[1]/div/ul/li[3]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[1]/div/ul/li[4]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[1]/div/ul/li[11]/button`,

    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[2]/div/ul/li[1]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[2]/div/ul/li[2]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[2]/div/ul/li[3]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[2]/div/ul/li[5]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[2]/div/ul/li[11]/button`,

    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[3]/div/ul/li[1]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[3]/div/ul/li[3]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[3]/div/ul/li[4]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[3]/div/ul/li[7]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[3]/div/ul/li[12]/button`,

    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[4]/div/ul/li[1]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[4]/div/ul/li[2]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[4]/div/ul/li[8]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[4]/div/ul/li[31]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[4]/div/ul/li[44]/button`,

    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[5]/div/ul/li[1]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[5]/div/ul/li[2]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[5]/div/ul/li[8]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[5]/div/ul/li[18]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[5]/div/ul/li[68]/button`,

    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[6]/div/ul/li[1]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[6]/div/ul/li[7]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[6]/div/ul/li[18]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[6]/div/ul/li[34]/button`,
    `//*[@id="se2_tool"]/div[2]/ul[7]/li/div/div/div/ul/li[6]/div/ul/li[22]/button`,
  ], // 이모지 메뉴별 아이템
  SUBJECT_COMBO_ELE: `//*[@id="directoryArea"]/div/div[1]/div[1]`, // 주제분류 콤보
  SUBJECT_TYPE: `//*[@id="seq21"]`, // 상품리뷰
  TAGS_ELE: `//*[@id="tagList"]`, // 태그
  SAVE_BTN_ELE: `//*[@id="btn_submit"]/img`, // 발행 버튼
} as const;

export { NAVER };
