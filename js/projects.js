function displayRepos(data){
    console.log(data);
}

const getUserInfo = () => {
    const api = "https://api.github.com/users/catneep/repos";

    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            displayRepos(data);
    })
    .catch((error) => alert("Couldn't retrieve project data."));
};

getUserInfo();