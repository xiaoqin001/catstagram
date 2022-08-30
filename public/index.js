// Your code here
const addContainer = () => {
    const newContainer = document.createElement("section");
    newContainer.className = "container"
    newContainer.style.display = "flex";
    newContainer.style.flexDirection = "column"
    newContainer.style.alignItems = "center";
    document.body.appendChild(newContainer);
}

const addTitle = () => {
    const newHead = document.createElement("h1");
    newHead.innerText = "Kitten Pic";
    newHead.style.textAlign = "center";
    const container = document.querySelector(".container");
    container.appendChild(newHead);
}

const getNewImg = async () => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search")
    .then(function(res){
        // console.log("response: ", res);
        return res.json(); // resolve in json format
    })
    return res;
}

const addImg = async () => {
    const container = document.querySelector(".container");

    // should use async & await to get the value returned
    // const res = await fetch("https://api.thecatapi.com/v1/images/search")
    // .then(function(res){
    //     // console.log("response: ", res);
    //     return res.json(); // resolve in json format
    // })


    const newImg = document.createElement("img");
    if (!localStorage.getItem("catImage")) {
        const res = await getNewImg();
        newImg.src = res[0].url;
        localStorage.setItem("catImage", newImg.src);
    } else {
        newImg.src = localStorage.getItem("catImage");
    }

    newImg.style.height = "500px";
    newImg.id = "catImage";
    // console.log(newImg.src);
    // console.log(document.getElementById("catImage").value);
    container.appendChild(newImg);
}

const addButton = () => {
    const newButton = document.createElement("button");
    newButton.type = "button";
    newButton.innerText = "Get a new kitten";
    newButton.style.marginTop = "50px"
    // 直接加在这里就可以 click+redirect method 1
    newButton.addEventListener("click", async (even) => {
        localStorage.clear();
        window.location.href = "/";
        // const res = await getNewImg();
        // const newImg = document.getElementById("catImage");
        // newImg.src = res[0].url;
        // localStorage.setItem("catImage", newImg.src);

    })
    const container = document.querySelector(".container");

    container.appendChild(newButton);

}

const addScore = () => {
    const scoreTitle = document.createElement("p");
    scoreTitle.innerText = "Popularity Score: ";

    const score = document.createElement('span');
    if (localStorage.getItem('score')) {
        score.innerText = localStorage.getItem('score');
    } else {
        score.innerText = 0;
        localStorage.setItem('score', score.innerText);
    }


    score.id = "score";


    // console.log(score);
    const container = document.querySelector(".container");
    container.appendChild(scoreTitle);
    scoreTitle.appendChild(score);
}

const addVote = () => {
    const newSection = document.createElement("section");
    newSection.className = "vote";
    newSection.style.display = "flex";
    newSection.style.flexDirection = "row";

    const upVote = document.createElement("button");
    upVote.type = "button";
    upVote.innerText = "Like";
    upVote.style.marginRight = "10px";
    const score = document.getElementById("score");
    upVote.addEventListener("click", event => {
        score.innerText ++;
        localStorage.setItem('score', score.innerText);
    })

    const downVote = document.createElement("button");
    downVote.type = "button";
    downVote.innerText = "Dislike";
    downVote.style.marginLeft = "10px";
    downVote.addEventListener("click", event => {
        score.innerText --;
        localStorage.setItem('score', score.innerText);
    })

    const container = document.querySelector(".container");
    container.appendChild(newSection);
    newSection.appendChild(upVote);
    newSection.appendChild(downVote);
}

// differences between id & classname
// differences between justify-content && others
const addComment = () => {
    const newSection = document.createElement("section");
    newSection.style.display = "flex";
    // newSection.style.flexDirection = 'row';
    // newSection.style.justifyContent = "center";
    newSection.className = "comment";

    const text = document.createElement('p');
    text.innerText = 'Comment: ';
    text.style.marginTop = "80px";
    text.style.marginRight = "10px";
    // console.log(text.value);

    const comment = document.createElement("textarea");
    comment.style.marginTop = "50px";
    comment.style.height = '150px';
    comment.style.width = '300px'
    // placeholder
    comment.placeholder = "Add a comment...";
    // console.log(comment.value);



    const submit = document.createElement('button');
    submit.innerText = "Submit";
    submit.type = "button";
    submit.style.marginTop = "80px";
    submit.style.height = "20px";
    submit.style.marginLeft = "10px";

    const comArea = document.createElement("section");
    comArea.id = "commentsArea";
    comArea.style.border = "solid grey";
    comArea.style.height = "400px";
    comArea.style.width = "900px";
    comArea.style.marginTop = "50px";

    if (localStorage.getItem("commentlist")) {
        const list = localStorage.getItem("commentlist");
        var commentlist = list.split(",");
        for (let i = 0; i < commentlist.length; i++) {
            const commentContainer = document.createElement('div');
            commentContainer.style.display = 'flex';

            const content = document.createElement('p');
            content.innerText = commentlist[i];

            const deleteButton = document.createElement('button');
            deleteButton.innerText = "Delete";
            deleteButton.type = 'button';
            deleteButton.style.height = "25px";
            deleteButton.style.marginTop = "15px";
            deleteButton.style.marginLeft = "10px";
            deleteButton.addEventListener("click", event => {
                commentContainer.remove();
                const idx = commentlist.indexOf(content.innerText);
                commentlist.splice(idx, 1);
                localStorage.setItem("commentlist", commentlist.toString());
            })

            commentContainer.appendChild(content);
            commentContainer.appendChild(deleteButton);

            comArea.appendChild(commentContainer);
        }

    } else {
        var commentlist = [];
    }

    submit.addEventListener("click", event => {
        if (comment.value) {
            commentlist.push(comment.value);

            const commentContainer = document.createElement('div');
            commentContainer.style.display = 'flex';

            const content = document.createElement('p');
            content.innerText = comment.value;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = "Delete";
            deleteButton.type = 'button';
            deleteButton.style.height = "25px";
            deleteButton.style.marginTop = "15px";
            deleteButton.style.marginLeft = "10px";
            deleteButton.addEventListener("click", event => {
                commentContainer.remove();
                const idx = commentlist.indexOf(content.innerText);
                commentlist.splice(idx, 1);
                localStorage.setItem("commentlist", commentlist.toString());
            })

            commentContainer.appendChild(content);
            commentContainer.appendChild(deleteButton);

            comArea.appendChild(commentContainer);
            comment.value = '';
            localStorage.setItem("commentlist", commentlist.toString());
        }
    })


    const container = document.querySelector(".container");
    container.appendChild(newSection);
    container.appendChild(comArea);

    newSection.appendChild(text);
    newSection.appendChild(comment);
    newSection.appendChild(submit);

}

window.onload = async () => {
    addContainer();
    addTitle();
    await addImg();
    addButton();
    addScore();
    addVote();
    addComment();
}
