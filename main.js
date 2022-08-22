let ms = 75;
     
document.querySelector(".btn").addEventListener("click", (e) => {
        let ip = document.querySelector("input");
        let n = parseInt(ip.value);
        if (n < 4) {
          alert("N should be more than 3");
          n = 0;
          ip.value = 4;
        } else if (n > 16) {
          alert("N should be less than 16");
          n = 0;
          ip.value = 16;
        }

        let board = createboard(n);

        solve(board, 0);
      });
      document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          document.querySelector("button").click();
        }
      });

      function createboard(n) {
        let board = new Array(n);
        for (let i = 0; i < n; i++) {
          board[i] = [];
          for (let j = 0; j < n; j++) {
            board[i] = new Array(n);
          }
        }
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            board[i][j] = 0;
          }
        }

        if (n < 8) {
          ms = 250;
        } else if (n < 11) {
          ms = 150;
        }
        return board;
      }
      async function printboard(board) {

        div = document.querySelector(".body");

        div.innerHTML = "";
        for (let i = 0; i < board.length; i++) {
          let row = document.createElement("tr");
          for (let j = 0; j < board.length; j++) {
            let cel = document.createElement("td");
            cel.innerHTML = board[i][j];
            if (board[i][j] == "Q") {
              cel.classList.add("q");
            }
            row.appendChild(cel);
          }

          div.appendChild(row);
        }
      }
      function isvalid(board, row, col) {
        let n = board.length;
        for (let i = 0; i < n; i++) {
          if (board[i][col] == "Q") {
            return false;
          }
        }
        for (let i = 0; i < n; i++) {
          if (board[row][i] == "Q") {
            return false;
          }
        }
        let j = col;
        for (let i = row; i >= 0; i--) {
          if (board[i][j] == "Q") {
            return false;
          }
          j--;
        }
        j = col;
        for (let i = row; i >= 0; i--) {
          if (board[i][j] == "Q") {
            return false;
          }
          j++;
        }
        return true;
      }
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      async function solve(board, row) {
        if (row >= board.length) {
          return true;
        }
        for (let col = 0; col < board.length; col++) {
          if ((await isvalid(board, row, col)) == true) {
            board[row][col] = "Q";
            await printboard(board);
            await sleep(ms);
            if ((await solve(board, row + 1)) == true) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
