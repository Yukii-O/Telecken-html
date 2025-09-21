 function checkAnswer(q) {
      if (q === 1) {
        let ans = document.getElementById("answer1").value.trim().toLowerCase();
        if (ans === "sb2te3" || ans === "sb₂te₃") {
          document.getElementById("feedback1").textContent = "Correto!";
          document.getElementById("feedback1").className = "feedback correct";
          document.getElementById("q2").classList.remove("hidden");
        } else {
          document.getElementById("feedback1").textContent = "Errado! Tente novamente.";
          document.getElementById("feedback1").className = "feedback wrong";
        }
      }

      if (q === 2) {
        let ans = document.getElementById("answer2").value;
        if (ans === "termoeletricos") {
          document.getElementById("feedback2").textContent = "Correto!";
          document.getElementById("feedback2").className = "feedback correct";
          document.getElementById("q3").classList.remove("hidden");
        } else {
          document.getElementById("feedback2").textContent = "Errado! Tente novamente.";
          document.getElementById("feedback2").className = "feedback wrong";
        }
      }

      if (q === 3) {
        let radios = document.getElementsByName("answer3");
        let selected = "";
        for (let r of radios) {
          if (r.checked) selected = r.value;
        }
        if (selected === "isolantes") {
          document.getElementById("feedback3").textContent = "Correto! Você concluiu o quiz!";
          document.getElementById("feedback3").className = "feedback correct";
        } else {
          document.getElementById("feedback3").textContent = "Errado! Tente novamente.";
          document.getElementById("feedback3").className = "feedback wrong";
        }
      }
    }
  