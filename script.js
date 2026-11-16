

const newsContainer = document.getElementById("news-container");

fetch("https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=10")
    .then(response => response.json())
    .then(data => {

        newsContainer.innerHTML = "";

        data.hits.forEach(news => {

            const title = news.title || news.story_title;
            const url = news.url || news.story_url;

            if (!title || !url) return;

            newsContainer.innerHTML += `
                <div class="news-card">
                    <h3>${title}</h3>
                    <p>Author: ${news.author}</p>
                    <p>Date: ${new Date(news.created_at).toLocaleDateString()}</p>
                    <a href="${url}" target="_blank">Read More</a>
                </div>
            `;
        });

    })
    .catch(error => {
        newsContainer.innerHTML = "Unable to fetch news.";
        console.log("Error:", error);
    });
