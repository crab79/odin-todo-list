import logoSrc from "../../img/check-mark.png";

const header = () => {
    // Create header element
    const header = document.querySelector("header");

    // Create theme container
    const div_theme = document.createElement("div");
    div_theme.id = "div_theme";


    // Create label for the switch
    const label = document.createElement("label");
    label.classList.add("switch");

    // Create input element for the switch
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    // Create span element for the slider
    const span = document.createElement("span");
    span.id = "slider";

    // Append input and span elements to the label
    label.appendChild(input);
    label.appendChild(span);

    // Append elements to the theme
    div_theme.appendChild(label);

    // Create logo container
    const div_logo = document.createElement("div");
    div_logo.id = "div_logo";

    // Create logo image element
    const logo = document.createElement("img");
    logo.src = logoSrc;

    // Create title element
    const title = document.createElement("h1");
    title.textContent = "Todoooo";
    title.id = "title";

    // Append logo and title elements to the logo container
    div_logo.append(logo);
    div_logo.append(title);

    // Append the logo container to the header
    header.append(div_logo);
    header.append(div_theme);

    //change theme color
    function changeTheme(event) {
        const bright = 'rgb(255, 243, 207)';
        const dark = 'rgb(60, 72, 107)';
        const white = 'rgb(255, 255, 255)';
        const black = 'rgb(0, 0, 0)';
        //content: bg color
        const content = document.getElementById('content');
        const computedStyle_content = window.getComputedStyle(content);
        const backgroundColor_content= computedStyle_content.backgroundColor;
        //addingSthButtons: bg text color
        const addingSthButtons = Array.from(document.getElementsByClassName('addingSthButton'));
        const addingSthButtons_bright = Array.from(document.getElementsByClassName('addingSthButton-bright'));
        //aTodo: bg text color
        const aTodo = Array.from(document.getElementsByClassName('aTodo'));
        const aTodo_bright = Array.from(document.getElementsByClassName('aTodo-bright'));

        //change color
        if (backgroundColor_content === dark) {
            content.style.backgroundColor = bright;
            addingSthButtons.forEach(button => {
                button.className = "addingSthButton-bright";
            });
            aTodo.forEach(todo => {
                todo.className = "aTodo-bright";

            });
        } else if (backgroundColor_content === bright) {
            content.style.backgroundColor = dark;
            addingSthButtons_bright.forEach(button => {
                button.className = "addingSthButton";
            });
            aTodo_bright.forEach(todo => {
                todo.className = "aTodo";
            });
        }
    }
    
    span.addEventListener("click", changeTheme);
}

export {header};