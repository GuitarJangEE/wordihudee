document.title = "Wordihudee";
const timerSpot = document.getElementById("timer");
const overSpot = document.getElementById("over");
const imgOverSpot = document.getElementById("imgover");
const vic = document.getElementById("vic");
const imgvic = document.getElementById("imgvic");
// querySelector은 첫번째로일치하는 단일요소를 불러오고 All은 모든요소를 선택한다
const keyPad = document.querySelectorAll(".keyboard-key");
const keyPadBig = document.querySelectorAll(".keyboard-bigkey");
const 정답 = "TRAIN";
let 위치 = 0;
let 기회 = 0;
let 키 = keyPad;

function 게임시작() {
  const 백함수 = () => {
    if (위치 > 0) {
      preBlock = document.querySelector(`.kan[word='${기회}${위치 - 1}']`);
      preBlock.innerText = "";
      위치 -= 1;
    }
  };
  const 기회한번씀 = () => {
    if (기회 === 5) return gameOver();
    기회 += 1;
    위치 = 0;
  };
  const 승리 = () => {
    window.removeEventListener("keydown", press);
    keyPad.forEach((a) => {
      a.removeEventListener("click", 반환);
    });
    keyPadBig.forEach((a) => {
      a.removeEventListener("click", 반환);
    });
    clearInterval(멈추자);
    vic.style = "display: block;";
    imgvic.style = "transform: rotateX(0deg); opacity: 1";
  };
  const gameOver = () => {
    window.removeEventListener("keydown", press);
    keyPad.forEach((a) => {
      a.removeEventListener("click", 반환);
    });
    keyPadBig.forEach((a) => {
      a.removeEventListener("click", 반환);
    });
    clearInterval(멈추자);
    overSpot.style = "display: block;";
    imgOverSpot.style = "transform: rotateX(0deg); opacity: 1";
  };
  const 정답확인 = () => {
    console.log("정답확인해봄");
    let 맞은갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const 답안지 = document.querySelector(`.kan[word='${기회}${i}']`);
      const 답안지글자 = 답안지.innerText;
      const 정답글자 = 정답[i];
      const 키보드야 = document.querySelector(`
        .keyboard-key[data-key="${답안지글자}"]`);
      // const 키보드글자 = 키보드야.innerText;
      // console.log("정답글자", 키보드글자);
      if (정답글자 === 답안지글자) {
        // console.log("if안 답안지글자", 답안지글자);
        // console.log("if안 정답글자", 정답글자);
        맞은갯수 += 1;
        답안지.style.backgroundColor = "#6AAA64";
        답안지.style.color = "white";
        키보드야.style.backgroundColor = "#6AAA64";
        키보드야.style.color = "white";
      } else if (정답.includes(답안지글자)) {
        답안지.style.backgroundColor = "#c9b458";
        답안지.style.color = "white";
        키보드야.style.backgroundColor = "#c9b458";
        키보드야.style.color = "white";
      } else {
        답안지.style.backgroundColor = "gray";
        답안지.style.color = "white";
        키보드야.style.backgroundColor = "gray";
        키보드야.style.color = "white";
      }
    }

    if (맞은갯수 === 5) 승리();
    else 기회한번씀();
  };
  const press = (a) => {
    const key = a.key.toUpperCase();
    const keyCode = a.keyCode;
    const wordBlock = document.querySelector(`.kan[word='${기회}${위치}']`);
    if (a.key === "Enter" && 위치 === 5) {
      console.log("엔터인식");
      정답확인();
    }
    if (a.key === "Backspace") {
      백함수();
    }
    if (위치 === 5) {
      return;
      //   칸꽉차서리턴
    }
    // console.log(key);
    if (65 <= keyCode && keyCode <= 90) {
      wordBlock.innerText = key;
      위치 += 1;
    }
  };
  function 반환() {
    const 데이터키 = this.getAttribute("data-key");
    const wordBlock = document.querySelector(`.kan[word='${기회}${위치}']`);
    if (데이터키 === "Backspace") {
      백함수();
    }
    if (데이터키 === "Enter" && 위치 === 5) {
      console.log("엔터인식");
      정답확인();
    }
    if (위치 === 5) {
      return;
      //   칸 꽉차서 리턴
    }

    // console.log(데이터키);

    //ㄹㄴㄹㅁㄴㄻㄴ
    if (데이터키.length === 1) {
      wordBlock.innerText = 데이터키;
      위치 += 1;
    }
    // console.log(위치, 기회);
  }
  keyPad.forEach((a) => {
    a.addEventListener("click", 반환);
  });
  keyPadBig.forEach((a) => {
    a.addEventListener("click", 반환);
  });
  window.addEventListener("keydown", press);
}
게임시작();
// 타이머임니당
const stopTime = new Date();
const timer = () => {
  const liveTime = new Date();
  const gameTime = new Date(liveTime - stopTime);
  const bunCho = `${gameTime.getMinutes()}분 ${gameTime.getSeconds()}초`;
  timerSpot.innerText = `${gameTime.getMinutes()}분 ${gameTime.getSeconds()}초`;
};
const 멈추자 = setInterval(timer, 1000);

// function getDataKey() {
// data-key 속성이 "Q"인 요소 선택
//   if (keyPad) {
//     // data-key 속성 값 가져오기
//     const dataKeyValue = keyPad.getAttribute("data-key");
//     console.log(`data-key 값: ${dataKeyValue}`);
//   } else {
//     console.log("해당 요소를 찾을 수 없습니다.");
//   }
// }

// function changeTextColors() {
//   // 각 요소의 data-key 속성 값을 확인하고 조건에 따라 색상 변경
//   keyPad.forEach(function (key) {
//     const dataKey = key.getAttribute("data-key");

//     if (
//       dataKey === "Z" ||
//       dataKey === "X" ||
//       dataKey === "C" ||
//       dataKey === "V" ||
//       dataKey === "B" ||
//       dataKey === "N" ||
//       dataKey === "M"
//     ) {
//       key.style.color = "red"; // 원하는 색상으로 변경
//     }
//   });
// // }
// const keyPad = document.querySelectorAll(".keyboard-key");

// ID 값을 추출하여 저장할 배열
