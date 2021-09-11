var X_CLASS="x";
        var O_CLASS="o";
        //Winning Combination
        var WINNING_COMBINATION=[
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]
        //getting Elements by DOM
        var cellElements=document.querySelectorAll(".cell");
        var board=document.getElementById("board");
        var winningMessageElement=document.getElementById("winning-message");
        var textWinningMessageElement=document.getElementById("text-winning-message");
        var restartButton=document.getElementById("restart-button");
        //turns variable
        var oTurn;

        startGame();
        restartButton.addEventListener('click',startGame);
        function startGame(){
            oTurn=false;
            cellElements.forEach(cell =>{
                cell.classList.remove(X_CLASS);
                cell.classList.remove(O_CLASS);
                cell.removeEventListener('click',handleClick);
                cell.addEventListener('click',handleClick,{once:true})
            });
            setBoardHoverClass();
            winningMessageElement.classList.remove('show');
        }
        function handleClick(e)
        {
            cell=e.target;
            const currentClass=oTurn?O_CLASS:X_CLASS;
            placeMark(cell,currentClass);
            if(checkWin(currentClass))
            {
                endGame(false);
            }
            else if(isDraw())
            {
                endGame(true);
            }
            else
            {
                switchTurn();
                setBoardHoverClass();
            }
        }
        function checkWin(currentClass)
        {
            return WINNING_COMBINATION.some(combination =>{
                return combination.every(index =>{
                    return cellElements[index].classList.contains(currentClass);
                });
            });
        }
        function isDraw()
        {
            return [...cellElements].every(cell =>{
                return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
            });
        }
        function endGame(draw)
        {
            if(draw)
            {
                textWinningMessageElement.innerHTML="Game Draw ! ";
            }
            else{
                textWinningMessageElement.innerHTML=`Congrat's${oTurn?"  <span class='O'>O's</span> Wins The Game.":"  <span class='X'>X's</span> Wins The Game."}`;
            }
            winningMessageElement.classList.add('show');
        }
        function placeMark(cell,currentClass)
        {
            cell.classList.add(currentClass);
        }
        function switchTurn()
        {
            oTurn = !oTurn;
        }
        function setBoardHoverClass()
        {
            if(oTurn)
            {
                board.classList.remove(X_CLASS);
                board.classList.add(O_CLASS);
            }
            else{
                board.classList.remove(O_CLASS);
                board.classList.add(X_CLASS);
            }
        }