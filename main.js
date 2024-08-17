document.getElementById("trial-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o redirecionamento padrão do formulário

  const form = event.target;
  const data = new FormData(form);

  fetch("https://sheetdb.io/api/v1/9y5q1swxhx571", {
    method: "POST",
    body: data,
  })
  .then(response => {
    if (response.ok) {
      // Redireciona para a página desejada após o envio bem-sucedido
      window.location.href = "https://chat.conectasolucoesinteligentes.com/signup";
    } else {
      alert("Houve um problema ao enviar os dados. Por favor, tente novamente.");
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Erro ao enviar os dados.");
  });
});