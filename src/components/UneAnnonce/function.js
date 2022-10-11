let index = 1;
showDivs(index);

function plusDivs(n) {
    showDivs(index += n);
}

function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("UneAnnonce-img-annonce");
    if (n > x.length) {
        index = 1;
    }
    if (n < 1) {
        index = x.length;
    }
    
    for (i = 0; i < x.length; i++) {
    //    x[i].style.display = 'none';  
    }

    // x[i].style.display = 'block';
}

export default plusDivs