const day_input = document.querySelector(".hari");
const month_input = document.querySelector(".bulan");
const year_input = document.querySelector(".tahun");
const button = document.querySelector(".button");
const errors = document.querySelectorAll(".error-text");
const error_year = document.querySelector(".error-tahun");
const error_month = document.querySelector(".error-bulan");
const error_day = document.querySelector(".error-hari");
const inputs = document.querySelectorAll(".input");
const labels = document.querySelectorAll("labels");
const years_old = document.querySelector(".years");
const months_old = document.querySelector(".months");
const days_old = document.querySelector(".days");

const current_date = new Date();
const year = current_date.getFullYear();
const month = current_date.getMonth();
const day = current_date.getDate();

let birth_year_valid = false;

const inputan_kosong = () => {
    inputs.forEach(input => {
        if(input.value == "") {
            input.style.border = "1px solid #FF5959";
            input.parentElement.style.color = "#FF5959";
            input.nextElementSibling.innerHTML = "This field is required";
            input.nextElementSibling.classList.remove("hidden");
        } else {
            input.style.border = "1px solid #716F6F";
            input.parentElement.style.color = "#716F6F";
            input.nextElementSibling.classList.add("hidden");
        }
    })
}

const change_color_show_text = (input, error) => {
    input.style.border = "1px solid #FF5959";
    input.parentElement.style.color = "#FF5959";
    error.classList.remove("hidden");
}

const tahun_depan = () => {
    if(year_input.value > year ) {
        change_color_show_text(year_input, error_year);
        error_year.innerHTML = "Must be in the past"
    } 
}

const tahun_valid = () => {
    if(year_input.value < 1) {
        change_color_show_text(year_input, error_year);
        error_year.innerHTML = "Must be a valid year";
    }
}

const bulan_valid = () => {
    if(month_input.value != "") {
        if(month_input.value > 12 || month_input.value < 1) {
            change_color_show_text(month_input, error_month);
            error_month.innerHTML = "Must be a valid month";
        }
    }

}

const hari_valid = () => {
    if(day_input.value != "") {
        if(day_input.value > 31 || day_input.value < 1) {
            change_color_show_text(day_input, error_day);
            error_day.innerHTML = "Must be a valid day";
        }
    }

}

const tanggal_valid = () => {
    let days30array = [04, 06, 10, 11];
    for(let i = 0; i < days30array.length; i++) {
        if(month_input.value == 02 && day_input.value > 28) {
            change_color_show_text(day_input, error_day);
            error_day.innerHTML = "Must be a valid date"; 
            } 
        else if(day_input.value == 31 && month_input.value == days30array[i]) {
            change_color_show_text(day_input, error_day);
            error_day.innerHTML = "Must be a valid date"; 
        } 
        else if(year_input.value < 1893) {
            change_color_show_text(day_input, error_day);
            error_day.innerHTML = "Must be a valid date"; 
        }
    }
}

const hitung_umur = () => {
    let dateOfBirth = new Date(year_input.value, month_input.value, day_input.value);
    let diff_in_time = current_date.getTime() - dateOfBirth.getTime();
    let diff_in_days = diff_in_time / (1000 * 3600 * 24);
    let years = Math.floor(diff_in_days / 365.25);
    let months = Math.floor((diff_in_days - (years * 365.25)) / 30.4375);
    let days = Math.floor(diff_in_days - (years * 365.25) - (months * 30.4375));
    if(birth_year_valid) {
        years_old.innerHTML = years;
        months_old.innerHTML = months;
        days_old.innerHTML = days;
    } else {
        years_old.innerHTML = "--";
        months_old.innerHTML = "--";
        days_old.innerHTML = "--";
    }
 
}

const check_if_valid = () => {
    if(error_day.classList.contains("hidden") && error_month.classList.contains("hidden") && error_year.classList.contains("hidden")) {
        console.log("yes")
        birth_year_valid = true;
    } else {
        birth_year_valid = false;
    }
    
}

button.onclick = () => {
    inputan_kosong();
    tahun_depan();
    tahun_valid();
    bulan_valid();
    hari_valid();
    tanggal_valid();
    check_if_valid();

    hitung_umur();
    
}
