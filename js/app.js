(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function remove_class(block, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelector(block).classList.add("_delete-money");
            document.querySelector(block).textContent = sessionStorage.getItem("money");
        }), 500);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_delete-money");
        }), 1500);
    }
    function no_money(block) {
        document.querySelector(block).classList.add("_no-money");
        setTimeout((() => {
            document.querySelector(block).classList.remove("_no-money");
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        setTimeout((() => {
            document.querySelector(block).textContent = +sessionStorage.getItem("money") + count;
            document.querySelector(block).classList.add("_anim-add-money");
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), delay);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_anim-add-money");
        }), delay_off);
    }
    function get_random_animate() {
        let number = get_random(0, 4);
        let arr = [ "jump", "jump-2", "rotate", "scale" ];
        let block_icon = document.querySelector(".item-money__icon");
        if (block_icon.classList.contains("_anim-icon-jump")) block_icon.classList.remove("_anim-icon-jump"); else if (block_icon.classList.contains("_anim-icon-jump-2")) block_icon.classList.remove("_anim-icon-jump-2"); else if (block_icon.classList.contains("_anim-icon-rotate")) block_icon.classList.remove("_anim-icon-rotate"); else if (block_icon.classList.contains("_anim-icon-scale")) block_icon.classList.remove("_anim-icon-scale");
        block_icon.classList.add(`_anim-icon-${arr[number]}`);
    }
    if (document.querySelector(".item-money__icon")) setInterval((() => {
        get_random_animate();
    }), 12e3);
    let config = {
        price_tank_2: 3e4,
        price_tank_3: 5e4
    };
    function remove_inner_btn(number_tank) {
        document.querySelector(`.shop__button-tank_${number_tank}`).classList.remove("_not-purchased");
        document.querySelectorAll(".shop__price").forEach((el => {
            if (el.dataset.tank == number_tank) {
                el.style.transition = "0.5s ease";
                el.style.opacity = "0";
                setTimeout((() => {
                    el.remove();
                }), 500);
            }
        }));
        document.querySelector(`.shop__button-tank_${number_tank}`).innerHTML = "<p>Select</p>";
        document.querySelector(`.shop__button-tank_${number_tank} p`).style.transition = "0.5s ease";
    }
    function add_hold_btn(block) {
        document.querySelector(block).classList.add("_hold");
    }
    function remove_hold_btn(block) {
        document.querySelector(block).classList.remove("_hold");
    }
    if (document.querySelector(".shop")) {
        if (sessionStorage.getItem("tank-2")) remove_inner_btn(2); else document.querySelector(".bank__count_tank-2").textContent = config.price_tank_2;
        if (sessionStorage.getItem("tank-3")) remove_inner_btn(3); else document.querySelector(".bank__count_tank-3").textContent = config.price_tank_3;
    }
    let storage_min = {
        current_win: 0,
        current_loose: 0
    };
    if (document.querySelector(".game")) {
        sessionStorage.setItem("current-bet", "empty");
        sessionStorage.setItem("bet", 10);
    }
    function get_dataset_bet(block) {
        let data = block.dataset.bet;
        sessionStorage.setItem("bet", data);
    }
    function rotate_coin() {
        document.querySelector(".item-game__coin").classList.add("_rotate");
        setTimeout((() => {
            document.querySelector(".item-game__coin").classList.remove("_rotate");
            document.querySelector(".item-game__coin").classList.add("_rotate-normal");
            setTimeout((() => {
                document.querySelector(".item-game__coin").classList.remove("_rotate-normal");
                document.querySelector(".item-game__coin").classList.add("_rotate-low");
            }), 1e3);
        }), 1500);
    }
    function create_random_coin(num) {
        let coin = document.createElement("img");
        if (1 == num) coin.setAttribute("src", `img/mini-game/coin-head.png`); else if (2 == num) coin.setAttribute("src", `img/mini-game/coin-tail.png`);
        coin.classList.add("_create-coin");
        document.querySelector(".item-game__coin").append(coin);
        document.querySelector(".head").classList.add("_hide");
        document.querySelector(".tail").classList.add("_hide");
        document.querySelector(".item-game__coin").classList.remove("_rotate-low");
    }
    function check_mingame_over(num) {
        let bet = +sessionStorage.getItem("bet");
        let current_bet = sessionStorage.getItem("current-bet");
        let count_win = 0;
        if (1 == num && "head" == current_bet) {
            document.querySelector(".win").classList.add("_active");
            count_win = 2 * bet;
            add_money(count_win, ".check", 1e3, 1500);
            document.querySelector(".win__text").textContent = count_win;
            storage_min.current_win += count_win;
            write_count(".game__sub-count_head", `+${storage_min.current_win}`);
        } else if (1 == num && "tail" == current_bet) {
            document.querySelector(".loose").classList.add("_active");
            storage_min.current_loose -= bet;
            write_count(".game__sub-count_tail", storage_min.current_loose);
        } else if (2 == num && "tail" == current_bet) {
            document.querySelector(".win").classList.add("_active");
            count_win = 2 * bet;
            add_money(count_win, ".check", 1e3, 1500);
            document.querySelector(".win__text").textContent = count_win;
            storage_min.current_win += count_win;
            write_count(".game__sub-count_head", `+${storage_min.current_win}`);
        } else if (2 == num && "head" == current_bet) {
            document.querySelector(".loose").classList.add("_active");
            storage_min.current_loose -= bet;
            write_count(".game__sub-count_tail", storage_min.current_loose);
        }
    }
    function write_count(block, count) {
        document.querySelector(block).textContent = count;
    }
    let cat_config = {
        timerId: false,
        current_left: 0,
        speed: .5,
        width: document.documentElement.clientWidth,
        current_position: 0
    };
    if (document.querySelector(".catgame")) {
        if (!sessionStorage.getItem("tank-active")) sessionStorage.setItem("tank-active", 1);
        create_hero();
    }
    function move_cat(num) {
        cat_config.timerId = setInterval((() => {
            cat_config.current_left += cat_config.speed;
            document.querySelector(".catgame__hero").style.left = `${cat_config.current_left}%`;
            cat_config.current_position = document.querySelector(".catgame__hero").getBoundingClientRect().left;
            if (83 == cat_config.current_left) clearInterval(cat_config.timerId);
            if (cat_config.current_position >= num) {
                clearInterval(cat_config.timerId);
                document.querySelector(".catgame__hero").classList.remove("_active");
                create_fire();
                setTimeout((() => {
                    document.querySelector(".loose").classList.add("_active");
                }), 1e3);
            }
        }), 50);
    }
    function create_hero() {
        let image = document.createElement("img");
        image.setAttribute("src", `img/shop/tank-${sessionStorage.getItem("tank-active")}.png`);
        image.setAttribute("alt", `Image`);
        document.querySelector(".catgame__hero").append(image);
    }
    function create_fire() {
        let image = document.createElement("img");
        image.setAttribute("src", `img/icons/bum.png`);
        image.setAttribute("alt", `Image`);
        image.classList.add("catgame__fire");
        document.querySelector(".catgame__hero").append(image);
        setTimeout((() => {
            image.classList.add("_active");
        }), 100);
    }
    function get_coeff() {
        let position = cat_config.current_position;
        let one_width = cat_config.width / 10;
        return Math.ceil(position / one_width) + 1;
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".shop__button-tank_1")) {
            sessionStorage.setItem("tank-active", 1);
            remove_class(".shop__item", "_selected");
            targetElement.closest(".shop__item").classList.add("_selected");
        }
        if (targetElement.closest(".shop__button-tank_2")) if (sessionStorage.getItem("tank-2")) {
            sessionStorage.setItem("tank-active", 2);
            remove_class(".shop__item", "_selected");
            targetElement.closest(".shop__item").classList.add("_selected");
        } else if (+sessionStorage.getItem("money") >= config.price_tank_2) {
            delete_money(config.price_tank_2, ".check");
            sessionStorage.setItem("tank-2", true);
            setTimeout((() => {
                remove_inner_btn(2);
            }), 500);
        } else if (+sessionStorage.getItem("money") < config.price_tank_2) no_money(".check");
        if (targetElement.closest(".shop__button-tank_3")) if (sessionStorage.getItem("tank-3")) {
            sessionStorage.setItem("tank-active", 3);
            remove_class(".shop__item", "_selected");
            targetElement.closest(".shop__item").classList.add("_selected");
        } else if (+sessionStorage.getItem("money") >= config.price_tank_3) {
            delete_money(config.price_tank_3, ".check");
            sessionStorage.setItem("tank-3", true);
            setTimeout((() => {
                remove_inner_btn(3);
            }), 500);
        } else if (+sessionStorage.getItem("money") < config.price_tank_2) no_money(".check");
        if (targetElement.closest(".button_head")) {
            remove_class(".button", "_selected");
            document.querySelector(".button_head").classList.add("_selected");
            sessionStorage.setItem("current-bet", "head");
        }
        if (targetElement.closest(".button_tail")) {
            remove_class(".button", "_selected");
            document.querySelector(".button_tail").classList.add("_selected");
            sessionStorage.setItem("current-bet", "tail");
        }
        if (targetElement.closest(".item-game__button_bet") && +sessionStorage.getItem("money") >= +sessionStorage.getItem("bet")) if ("head" == sessionStorage.getItem("current-bet") || "tail" == sessionStorage.getItem("current-bet")) {
            add_hold_btn(".button_head");
            add_hold_btn(".button_tail");
            add_hold_btn(".bets");
            delete_money(+sessionStorage.getItem("bet"), ".check");
            setTimeout((() => {
                rotate_coin();
            }), 300);
            let number = get_random(1, 3);
            setTimeout((() => {
                create_random_coin(number);
                setTimeout((() => {
                    check_mingame_over(number);
                }), 500);
            }), 3300);
        }
        if (targetElement.closest(".bets__bet")) {
            remove_class(".bets__bet", "_active");
            targetElement.closest(".bets__bet").classList.add("_active");
            get_dataset_bet(targetElement.closest(".bets__bet"));
        }
        if (targetElement.closest(".win__button_play") || targetElement.closest(".loose__button_play")) {
            if (document.querySelector(".win").classList.contains("_active")) document.querySelector(".win").classList.remove("_active"); else if (document.querySelector(".loose").classList.contains("_active")) document.querySelector(".loose").classList.remove("_active");
            remove_hold_btn(".bets");
            if (document.querySelector(".game")) {
                document.querySelector("._create-coin").remove();
                document.querySelector(".head").classList.remove("_hide");
                document.querySelector(".tail").classList.remove("_hide");
                remove_hold_btn(".button_head");
                remove_hold_btn(".button_tail");
                remove_class(".button", "_selected");
                sessionStorage.setItem("current-bet", "empty");
            } else if (document.querySelector(".catgame")) {
                document.querySelector(".catgame__hero").style.left = `0%`;
                cat_config.current_left = 0;
                if (document.querySelector(".catgame__fire")) document.querySelector(".catgame__fire").remove();
                remove_hold_btn(".catgame__button");
            }
        }
        if (targetElement.closest(".catgame__button") && +sessionStorage.getItem("money") >= +sessionStorage.getItem("bet")) if (!targetElement.closest(".catgame__button").classList.contains("_hold")) {
            add_hold_btn(".bets");
            add_hold_btn(".catgame__button");
            delete_money(+sessionStorage.getItem("bet"), ".check");
            document.querySelector(".catgame__hero").classList.add("_active");
            let random_width = get_random(0, cat_config.width - 200);
            move_cat(random_width);
        }
        if (targetElement.closest(".catgame__hero") && targetElement.closest(".catgame__hero").classList.contains("_active")) {
            clearInterval(cat_config.timerId);
            document.querySelector(".catgame__hero").classList.remove("_active");
            let prize = get_coeff() * +sessionStorage.getItem("bet");
            add_money(prize, ".check", 1e3, 2e3);
            document.querySelector(".win__text").textContent = prize;
            setTimeout((() => {
                document.querySelector(".win").classList.add("_active");
            }), 1e3);
        }
    }));
    window["FLS"] = true;
    isWebp();
})();