const seatGrid = document.querySelector('.seat-select__grid')
const seatRow = document.querySelector('.seat-row')
const seatLabel = document.querySelector('.seat-row__label')
const seatRowGroup = document.querySelector('.seat-row__group')
const rowSeats = document.querySelector('.seat-row__seats')


function GenerateRows() {

    let rowsHTML = ''

    for (let row = 1; row <= 10; row++) {

        let seatsHtmlOne = ''
        let seatsHtmlTwo = ''


        for (let seat = 1; seat <= 12; seat++) {

            if (seat < 7) {
                seatsHtmlOne += `
                <button class="seat" data-row="${row}" data-seat="${seat}">${seat}</button>
            `
            } else if (seat > 6){
                
                seatsHtmlTwo += `
                <button class="seat" data-row="${row}" data-seat="${seat}">${seat}</button>
                `
            }

        }

        rowsHTML += `
        <div class="seat-row">
            <span class="seat-row__label">${String.fromCharCode(64 + row)}</span>
            <div class="seat-row__seats">
                <div class="seat-row__group">
                    ${seatsHtmlOne}
                </div>
                <div class="seat-row__group">
                    ${seatsHtmlTwo}
                </div>
            </div>
            <span class="seat-row__label">${String.fromCharCode(64 + row)}</span>
        </div>
        `

    }

    seatGrid.innerHTML = rowsHTML

    // let buttonSeat = document.querySelectorAll('.seat')

    // buttonSeat.forEach(btn => {
    //     btn.addEventListener('click', function(e){
    //         const seat = e.target.closest()
    //     })
    // })

    document.querySelector('.seat-select__grid').addEventListener('click', function(e){
        const seat = e.target.closest('button')
        if(!seat) return

        seat.classList.toggle('seat-active')

        console.log(`Кликнули: ряд ${seat.dataset.row}, место ${seat.dataset.seat}`);
    })


}

GenerateRows()