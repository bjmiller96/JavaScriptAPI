document.addEventListener('DOMContentLoaded', () => {
    async function clickedImg(artwork_id, imgIndex) {
        let request = new Request(`https://api.artic.edu/api/v1/artworks/${artwork_id}`, {
            method: 'GET'
        });

        let result = await fetch(request);
        let response = await result.json();
        console.log(response);

        const modal = document.querySelector(`#img${imgIndex + 1}Info .modal-content`);
        const captionText = modal.querySelector(".modal-caption");

        let content = `
            <strong>About Artwork</strong>: <br><br>
            <hr id="modal-hr"><br>
            <strong>Title</strong>: ${response.data.title ? response.data.title : "N/A"} <br><br>
            <strong>Artist</strong>: ${response.data.artist_title ? response.data.artist_title : "N/A"} <br><br>
            <strong>Date</strong>: ${response.data.date_display ? response.data.date_display : "N/A"} <br><br>
            <strong>Style</strong>: ${response.data.style_title ? titleCase(response.data.style_title) : "N/A"} <br><br>
            <strong>Origin</strong>: ${response.data.place_of_origin ? response.data.place_of_origin : "N/A"} <br><br>
            <strong>Description</strong>: ${response.data.description ? response.data.description : "N/A"}
        `;

        captionText.innerHTML = content;
        toggleModal(true, imgIndex);
    }

    let toggleModal = (show = true, imgIndex) => {
        const modal = document.querySelector(`#img${imgIndex + 1}Info`);

        if(show){
            modal.style.display = "block";
            // document.body.classList.add('no-scroll');
        } else {
            modal.style.display = "none";
            // document.body.classList.remove('no-scroll')
        }
    }

    document.querySelector(".gallery").addEventListener('click', async event => {
        if(event.target.tagName === 'IMG'){
            document.querySelector(".spinner").style.display = "block";

            const artwork_id = event.target.getAttribute('data-id');
            const images = document.querySelectorAll('.gallery img');
            const imgIndex = [...images].indexOf(event.target);
            const modalClose = document.querySelector(`#img${imgIndex + 1}Info .close`);
            modalClose.onclick = () => toggleModal(false, imgIndex);
            
            await clickedImg(artwork_id, imgIndex);

            document.querySelector(".spinner").style.display = "none";
        }
    });

    let titleCase = str => {
        return str.replace(/\w\S*/g, word => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }

});
