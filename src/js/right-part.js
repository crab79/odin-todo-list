import infoSrc from "../../img/Info.png";
import editSrc from "../../img/Edit.png";
import deleteSrc from "../../img/Close.png";
import checkSrc from "../../img/Tick Box.png";

const right_part = () => {
    //creaate
    const content = document.getElementById("content");
    const rightPart = document.createElement("div");
    const div_todo = document.createElement("div");
    const div_colorSign = document.createElement("div");
    const div_h1AndH3 = document.createElement("div");
    const div_todoSetting = document.createElement("div");
    const h1_title = document.createElement("h1");
    const h3_dueDate = document.createElement("h3");
    const p_details = document.createElement("p");
    const p_edit = document.createElement("p");
    const p_delete = document.createElement("p");
    const div_details = document.createElement("div");
    const div_edit = document.createElement("div");
    const div_delete = document.createElement("div");
    const div_checkbox = document.createElement("div");
    const img_details = document.createElement("img");
    const img_edit = document.createElement("img");
    const img_delete = document.createElement("img");
    const img_check = document.createElement("img");

    //setting src
    img_details.src = infoSrc;
    img_edit.src = editSrc;
    img_delete.src = deleteSrc;
    img_check.src = checkSrc;

    //setting id
    rightPart.id = "rightPart";

    //setting class
    div_todo.className = "aTodo";
    div_colorSign.className = "colorSign";
    div_h1AndH3.className = "shortInfo";
    div_todoSetting.className = "todoSetting";
    div_checkbox.className = "checkbox"
    div_delete.className = "delete";
    div_details.className = "details";
    div_edit.className = "edit";

    //setting textcontent
    h1_title.textContent = "Todo1";
    h3_dueDate.textContent = "Due Day: 2024/06/06";
    p_details.textContent = "Details";
    p_edit.textContent = "Edit";
    p_delete.textContent = "Delete";

    //append
    div_checkbox.append(img_check);
    div_delete.append(img_delete, p_delete);
    div_details.append(img_details, p_details);
    div_edit.append(img_edit, p_edit);
    div_todoSetting.append(div_details, div_edit, div_delete);
    div_h1AndH3.append(h1_title, h3_dueDate);
    div_todo.append(div_colorSign);
    div_todo.append(div_h1AndH3);
    div_todo.append(div_todoSetting);
    div_todo.append(div_checkbox);
    rightPart.append(div_todo);
    content.append(rightPart);
}

export { right_part };