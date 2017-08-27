document.addEventListener('DOMContentLoaded', function(){
  let app = new Vue({
    el: "#app",
    data: {
      question: '',
      answer: "Estou esperando...",
      url: ""
    },
    watch: {
      question: function(){
        this.answer = "Hum... prossiga";
        this.getAnswer();
      }
    },
    methods: {
      getAnswer: _.debounce(function(){
        if(this.question == ''){
          this.answer = "Estou esperando...";
          this.url = '';
          return 0;
        }
        else if(this.question.indexOf('?') === -1){
          this.answer = "Perguntas costumam terminar com \"?\", certo?";
          return 0;
        }

        this.answer = "Deixe-me pensar...";

        axios.get("https://yesno.wtf/api")
          .then(res => {
            switch(res.data.answer){
              case "yes":
                this.answer = "Sim";
                break;
              case "no":
                this.answer = "Não";
                break;
              default:
                this.answer = "Não sei";
                break;
            }
            this.url = res.data.image;
          })
          .catch(err => {
            console.log(err);
            this.answer = "Não sei responder essa pergunta"
          });

      }, 500)
    }
  });
});
