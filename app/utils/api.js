import Axios from 'axios';

const id = '';
const sec = '';
const params = '?client_id=' + id + '&client_secret=' + sec;

function getProfile(username) {
    return Axios.get('https://api.github.com/users/' + username)
        .then(function(user){
            return user.data;
        });
}

function getRepos (username){
    return Axios.get('https://api.github.com/users/' + username);
}

function getStarCount(repos) {
    return repos.data.reduce(function(count, repo){
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos) {
    const followers = profile.followers;
    const totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(username) {
    return Axios.all([
        getProfile(username),
        getRepos(username)
    ]).then(function(data){
        const profile = data[0];
        const repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        };
    });
}

function sortPlayers(players){
    return players.sort(function(a, b){
        return b.score - a.score;
    });
}

module.exports = {
    battle: function(players) {
        return Axios
            .all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError);
    },

    fetchPopularRepos: function(language) {
        var encodedURI = window.encodeURI(
            'https://api.github.com/search/repositories?q=stars:>1+language:' +
            language +
            '&sort=star&order=desc&type=Repositories'
        );

        return Axios.get(encodedURI)
            .then(function(response){
                return response.data.items;
            });
    }
};