

fetch('https://ajax.test-danit.com/api/swapi/films').then(response => response.json())
    .then(data2 => {

        data2.forEach(({ episodeId, name, openingCrawl, characters }) => {


            const container = document.querySelector('.container')
            let id = 0

            container.insertAdjacentHTML('beforeend', `<ul ><h2>Film:</h2><li><span>Episode:</span>${episodeId}</li><li><span>Filmname:</span>${name}</li><li><span>Opening Crawl:</span>${openingCrawl}</li><li class = "charactersLoader">
            <p>LOADING...<p>
            <div class="bar bar1"></div>
            <div class="bar bar2"></div>
            <div class="bar bar3"></div>
            <div class="bar bar4"></div>
            <div class="bar bar5"></div>
            <div class="bar bar6"></div>
            <div class="bar bar7"></div>
            <div class="bar bar8"></div>
          </li></ul>`)


            document.querySelectorAll('span').forEach(el => el.className = 'bold')

            const ul = document.querySelectorAll('ul')

            ul.forEach(el => el.className = `${id++}`)

            const charactersArr = characters.map(el => fetch(el).then(response => response.json()))


            Promise.allSettled(charactersArr).then(result => {

                const newCharactersArr = result.map(el => el.value)

                const newCharactersArr2 = newCharactersArr.map(el => `<ul><li><span>Name:</span>${el.name}</li></ul>`)

                const charactersLoader = document.querySelectorAll('.charactersLoader')
                charactersLoader.forEach(el => el.remove())

                charactersUl = document.createElement('div')
                charactersUl.className = `${id++}`
                charactersUl.innerHTML = `<h2>Characters:</h2> ${newCharactersArr2.join('')}`

                if (ul.className != charactersUl.className) {

                    ul.forEach(el => el.append(charactersUl))
                }

                document.querySelectorAll('span').forEach(el => el.className = 'bold')

            }).catch(err => console.log(err))


        })

    }).catch(err =>
        console.log(err))


