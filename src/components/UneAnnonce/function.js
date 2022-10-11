let index = 1;
showDivs(index);

function plusDivs(n) {
    showDivs(index += n);
}

function showDivs(n) {
    // console.log("oui ça marche.");
    let i;
    let x = document.getElementsByClassName("UneAnnonce-img-annonce")[0];
    // if (n > x.length) {
    //     index = 1;
    // }
    // if (n < 1) {
    //     index = x.length;
    // }
    
    // for (i = 0; i < x.length; i++) {
    //     // x[index].style.display = 'none';  
    // }

    // x[index-1].style.display = 'block';
    // x.style.display = 'none'
}

export default plusDivs