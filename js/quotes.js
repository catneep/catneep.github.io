function Quote(quote, author) {
    this.quote = quote;
    this.author = author;
}

let quotes = [
    new Quote("Don't overthink it.", "Julian Casablancas"),
    new Quote("Ding ding dong dong ding ding dong dong ding dang.", "Anthony Kiedis"),
    new Quote("Well!", "Isaac Brock"),
    new Quote("Who was in Paris?", "Anonymous")
];

function setQuote(){
    let day = new Date().getDay();
    while (day >= quotes.length){
        day /= 2;
        day = Math.round(day);
    }

    let quote = document.getElementById('quoteContent');
    let author = document.getElementById('quoteAuthor');

    quote.innerHTML = quotes[day].quote;
    author.innerHTML = quotes[day].author;
}

setQuote();