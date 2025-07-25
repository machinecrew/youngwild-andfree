// Debug: pastikan config sudah dimuat
console.log("Isi dari quizData:", quizData);

window.onload = () => {
  const questionEl = document.getElementById("question");
  const clueEl = document.getElementById("clue");

  if (quizData && quizData.question) {
    questionEl.innerText = quizData.question;
    clueEl.innerText = "Clue: " + (quizData.clue || "Tidak ada petunjuk.");
  } else {
    questionEl.innerText = "Pertanyaan gagal dimuat.";
    clueEl.innerText = "";
    console.error("quizData tidak ditemukan.");
  }
};

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
  const notice = document.getElementById("notice");
  const reward = document.getElementById("reward");

  // ✅ Normalisasi jawaban benar sebagai array lowercase
  const correctAnswers = Array.isArray(quizData.answer)
    ? quizData.answer.map(a => a.trim().toLowerCase())
    : [quizData.answer.trim().toLowerCase()];

  if (correctAnswers.includes(userAnswer)) {
    // ✅ Jawaban benar
    notice.innerText = "";
    reward.style.display = "block";
    reward.innerHTML = `
      🎉 GOKS! Sikaaat dahhhh:
      <br><a href="${quizData.rewardLink}" target="_blank">🎁 Get Reward</a>
    `;
  } else {
    // ❌ Jawaban salah
    reward.style.display = "none";
    notice.innerText = "Jawaban Salah!";
    notice.style.display = "block";
    notice.style.color = "red";
    notice.style.fontWeight = "bold";
  }

  // Kosongkan input setelah menjawab
  document.getElementById("answer").value = "";
}
