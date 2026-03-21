/* flatpickr v4.6.13, @license MIT */ (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.flatpickr = factory());
})(this, function() {
    'use strict';
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for(var s, i = 1, n = arguments.length; i < n; i++){
                s = arguments[i];
                for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __spreadArrays() {
        for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
        for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
        return r;
    }
    var HOOKS = [
        "onChange",
        "onClose",
        "onDayCreate",
        "onDestroy",
        "onKeyDown",
        "onMonthChange",
        "onOpen",
        "onParseConfig",
        "onReady",
        "onValueUpdate",
        "onYearChange",
        "onPreCalendarPosition"
    ];
    var defaults = {
        _disable: [],
        allowInput: false,
        allowInvalidPreload: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        autoFillDefaultTime: true,
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enableSeconds: false,
        enableTime: false,
        errorHandler: function(err) {
            return typeof console !== "undefined" && console.warn(err);
        },
        getWeek: function(givenDate) {
            var date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            // January 4 is always in week 1.
            var week1 = new Date(date.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
            return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        monthSelectorType: "dropdown",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date(),
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: undefined,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false
    };
    var english = {
        weekdays: {
            shorthand: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            longhand: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ]
        },
        months: {
            shorthand: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            longhand: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]
        },
        daysInMonth: [
            31,
            28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ],
        firstDayOfWeek: 0,
        ordinal: function(nth) {
            var s = nth % 100;
            if (s > 3 && s < 21) return "th";
            switch(s % 10){
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: [
            "AM",
            "PM"
        ],
        yearAriaLabel: "Year",
        monthAriaLabel: "Month",
        hourAriaLabel: "Hour",
        minuteAriaLabel: "Minute",
        time_24hr: false
    };
    var pad = function(number, length) {
        if (length === void 0) length = 2;
        return ("000" + number).slice(length * -1);
    };
    var int = function(bool) {
        return bool === true ? 1 : 0;
    };
    /* istanbul ignore next */ function debounce(fn, wait) {
        var t;
        return function() {
            var _this = this;
            var args = arguments;
            clearTimeout(t);
            t = setTimeout(function() {
                return fn.apply(_this, args);
            }, wait);
        };
    }
    var arrayify = function(obj) {
        return obj instanceof Array ? obj : [
            obj
        ];
    };
    function toggleClass(elem, className, bool) {
        if (bool === true) return elem.classList.add(className);
        elem.classList.remove(className);
    }
    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== undefined) e.textContent = content;
        return e;
    }
    function clearNode(node) {
        while(node.firstChild)node.removeChild(node.firstChild);
    }
    function findParent(node, condition) {
        if (condition(node)) return node;
        else if (node.parentNode) return findParent(node.parentNode, condition);
        return undefined; // nothing found
    }
    function createNumberInput(inputClassName, opts) {
        var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
        if (navigator.userAgent.indexOf("MSIE 9.0") === -1) numInput.type = "number";
        else {
            numInput.type = "text";
            numInput.pattern = "\\d*";
        }
        if (opts !== undefined) for(var key in opts)numInput.setAttribute(key, opts[key]);
        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);
        return wrapper;
    }
    function getEventTarget(event) {
        try {
            if (typeof event.composedPath === "function") {
                var path = event.composedPath();
                return path[0];
            }
            return event.target;
        } catch (error) {
            return event.target;
        }
    }
    var doNothing = function() {
        return undefined;
    };
    var monthToStr = function(monthNumber, shorthand, locale) {
        return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
    };
    var revFormat = {
        D: doNothing,
        F: function(dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: function(dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        H: function(dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function(dateObj, amPM, locale) {
            dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
        },
        M: function(dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: function(dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: function(_, unixSeconds) {
            return new Date(parseFloat(unixSeconds) * 1000);
        },
        W: function(dateObj, weekNum, locale) {
            var weekNumber = parseInt(weekNum);
            var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
            date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
            return date;
        },
        Y: function(dateObj, year) {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: function(_, ISODate) {
            return new Date(ISODate);
        },
        d: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function(dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        i: function(dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: doNothing,
        m: function(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function(dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: function(_, unixMillSeconds) {
            return new Date(parseFloat(unixMillSeconds));
        },
        w: doNothing,
        y: function(dateObj, year) {
            dateObj.setFullYear(2000 + parseFloat(year));
        }
    };
    var tokenRegex = {
        D: "",
        F: "",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})"
    };
    var formats = {
        // get the date in UTC
        Z: function(date) {
            return date.toISOString();
        },
        // weekday name, short, e.g. Thu
        D: function(date, locale, options) {
            return locale.weekdays.shorthand[formats.w(date, locale, options)];
        },
        // full month name e.g. January
        F: function(date, locale, options) {
            return monthToStr(formats.n(date, locale, options) - 1, false, locale);
        },
        // padded hour 1-12
        G: function(date, locale, options) {
            return pad(formats.h(date, locale, options));
        },
        // hours with leading zero e.g. 03
        H: function(date) {
            return pad(date.getHours());
        },
        // day (1-30) with ordinal suffix e.g. 1st, 2nd
        J: function(date, locale) {
            return locale.ordinal !== undefined ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
        },
        // AM/PM
        K: function(date, locale) {
            return locale.amPM[int(date.getHours() > 11)];
        },
        // shorthand month e.g. Jan, Sep, Oct, etc
        M: function(date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        // seconds 00-59
        S: function(date) {
            return pad(date.getSeconds());
        },
        // unix timestamp
        U: function(date) {
            return date.getTime() / 1000;
        },
        W: function(date, _, options) {
            return options.getWeek(date);
        },
        // full year e.g. 2016, padded (0001-9999)
        Y: function(date) {
            return pad(date.getFullYear(), 4);
        },
        // day in month, padded (01-30)
        d: function(date) {
            return pad(date.getDate());
        },
        // hour from 1-12 (am/pm)
        h: function(date) {
            return date.getHours() % 12 ? date.getHours() % 12 : 12;
        },
        // minutes, padded with leading zero e.g. 09
        i: function(date) {
            return pad(date.getMinutes());
        },
        // day in month (1-30)
        j: function(date) {
            return date.getDate();
        },
        // weekday name, full, e.g. Thursday
        l: function(date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        // padded month number (01-12)
        m: function(date) {
            return pad(date.getMonth() + 1);
        },
        // the month number (1-12)
        n: function(date) {
            return date.getMonth() + 1;
        },
        // seconds 0-59
        s: function(date) {
            return date.getSeconds();
        },
        // Unix Milliseconds
        u: function(date) {
            return date.getTime();
        },
        // number of the day of the week
        w: function(date) {
            return date.getDay();
        },
        // last two digits of year e.g. 16 for 2016
        y: function(date) {
            return String(date.getFullYear()).substring(2);
        }
    };
    var createDateFormatter = function(_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
        return function(dateObj, frmt, overrideLocale) {
            var locale = overrideLocale || l10n;
            if (config.formatDate !== undefined && !isMobile) return config.formatDate(dateObj, frmt, locale);
            return frmt.split("").map(function(c, i, arr) {
                return formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
            }).join("");
        };
    };
    var createDateParser = function(_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
        return function(date, givenFormat, timeless, customLocale) {
            if (date !== 0 && !date) return undefined;
            var locale = customLocale || l10n;
            var parsedDate;
            var dateOrig = date;
            if (date instanceof Date) parsedDate = new Date(date.getTime());
            else if (typeof date !== "string" && date.toFixed !== undefined // timestamp
            ) // create a copy
            parsedDate = new Date(date);
            else if (typeof date === "string") {
                // date string
                var format = givenFormat || (config || defaults).dateFormat;
                var datestr = String(date).trim();
                if (datestr === "today") {
                    parsedDate = new Date();
                    timeless = true;
                } else if (config && config.parseDate) parsedDate = config.parseDate(date, format);
                else if (/Z$/.test(datestr) || /GMT$/.test(datestr) // datestrings w/ timezone
                ) parsedDate = new Date(date);
                else {
                    var matched = void 0, ops = [];
                    for(var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++){
                        var token_1 = format[i];
                        var isBackSlash = token_1 === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;
                        if (tokenRegex[token_1] && !escaped) {
                            regexStr += tokenRegex[token_1];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) ops[token_1 !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token_1],
                                val: match[++matchIndex]
                            });
                        } else if (!isBackSlash) regexStr += "."; // don't really care
                    }
                    parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
                    ops.forEach(function(_a) {
                        var fn = _a.fn, val = _a.val;
                        return parsedDate = fn(parsedDate, val, locale) || parsedDate;
                    });
                    parsedDate = matched ? parsedDate : undefined;
                }
            }
            /* istanbul ignore next */ if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                return undefined;
            }
            if (timeless === true) parsedDate.setHours(0, 0, 0, 0);
            return parsedDate;
        };
    };
    /**
     * Compute the difference in dates, measured in ms
     */ function compareDates(date1, date2, timeless) {
        if (timeless === void 0) timeless = true;
        if (timeless !== false) return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
        return date1.getTime() - date2.getTime();
    }
    var isBetween = function(ts, ts1, ts2) {
        return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    var calculateSecondsSinceMidnight = function(hours, minutes, seconds) {
        return hours * 3600 + minutes * 60 + seconds;
    };
    var parseSeconds = function(secondsSinceMidnight) {
        var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
        return [
            hours,
            minutes,
            secondsSinceMidnight - hours * 3600 - minutes * 60
        ];
    };
    var duration = {
        DAY: 86400000
    };
    function getDefaultHours(config) {
        var hours = config.defaultHour;
        var minutes = config.defaultMinute;
        var seconds = config.defaultSeconds;
        if (config.minDate !== undefined) {
            var minHour = config.minDate.getHours();
            var minMinutes = config.minDate.getMinutes();
            var minSeconds = config.minDate.getSeconds();
            if (hours < minHour) hours = minHour;
            if (hours === minHour && minutes < minMinutes) minutes = minMinutes;
            if (hours === minHour && minutes === minMinutes && seconds < minSeconds) seconds = config.minDate.getSeconds();
        }
        if (config.maxDate !== undefined) {
            var maxHr = config.maxDate.getHours();
            var maxMinutes = config.maxDate.getMinutes();
            hours = Math.min(hours, maxHr);
            if (hours === maxHr) minutes = Math.min(maxMinutes, minutes);
            if (hours === maxHr && minutes === maxMinutes) seconds = config.maxDate.getSeconds();
        }
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    if (typeof Object.assign !== "function") Object.assign = function(target) {
        var args = [];
        for(var _i = 1; _i < arguments.length; _i++)args[_i - 1] = arguments[_i];
        if (!target) throw TypeError("Cannot convert undefined or null to object");
        var _loop_1 = function(source) {
            if (source) Object.keys(source).forEach(function(key) {
                return target[key] = source[key];
            });
        };
        for(var _a = 0, args_1 = args; _a < args_1.length; _a++){
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
    var DEBOUNCED_CHANGE_MS = 300;
    function FlatpickrInstance(element, instanceConfig) {
        var self1 = {
            config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
            l10n: english
        };
        self1.parseDate = createDateParser({
            config: self1.config,
            l10n: self1.l10n
        });
        self1._handlers = [];
        self1.pluginElements = [];
        self1.loadedPlugins = [];
        self1._bind = bind;
        self1._setHoursFromDate = setHoursFromDate;
        self1._positionCalendar = positionCalendar;
        self1.changeMonth = changeMonth;
        self1.changeYear = changeYear;
        self1.clear = clear;
        self1.close = close;
        self1.onMouseOver = onMouseOver;
        self1._createElement = createElement;
        self1.createDay = createDay;
        self1.destroy = destroy;
        self1.isEnabled = isEnabled;
        self1.jumpToDate = jumpToDate;
        self1.updateValue = updateValue;
        self1.open = open;
        self1.redraw = redraw;
        self1.set = set;
        self1.setDate = setDate;
        self1.toggle = toggle;
        function setupHelperFunctions() {
            self1.utils = {
                getDaysInMonth: function(month, yr) {
                    if (month === void 0) month = self1.currentMonth;
                    if (yr === void 0) yr = self1.currentYear;
                    if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;
                    return self1.l10n.daysInMonth[month];
                }
            };
        }
        function init() {
            self1.element = self1.input = element;
            self1.isOpen = false;
            parseConfig();
            setupLocale();
            setupInputs();
            setupDates();
            setupHelperFunctions();
            if (!self1.isMobile) build();
            bindEvents();
            if (self1.selectedDates.length || self1.config.noCalendar) {
                if (self1.config.enableTime) setHoursFromDate(self1.config.noCalendar ? self1.latestSelectedDateObj : undefined);
                updateValue(false);
            }
            setCalendarWidth();
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            /* TODO: investigate this further
        
              Currently, there is weird positioning behavior in safari causing pages
              to scroll up. https://github.com/chmln/flatpickr/issues/563
        
              However, most browsers are not Safari and positioning is expensive when used
              in scale. https://github.com/chmln/flatpickr/issues/1096
            */ if (!self1.isMobile && isSafari) positionCalendar();
            triggerEvent("onReady");
        }
        function getClosestActiveElement() {
            var _a;
            return ((_a = self1.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
        }
        function bindToInstance(fn) {
            return fn.bind(self1);
        }
        function setCalendarWidth() {
            var config = self1.config;
            if (config.weekNumbers === false && config.showMonths === 1) return;
            else if (config.noCalendar !== true) window.requestAnimationFrame(function() {
                if (self1.calendarContainer !== undefined) {
                    self1.calendarContainer.style.visibility = "hidden";
                    self1.calendarContainer.style.display = "block";
                }
                if (self1.daysContainer !== undefined) {
                    var daysWidth = (self1.days.offsetWidth + 1) * config.showMonths;
                    self1.daysContainer.style.width = daysWidth + "px";
                    self1.calendarContainer.style.width = daysWidth + (self1.weekWrapper !== undefined ? self1.weekWrapper.offsetWidth : 0) + "px";
                    self1.calendarContainer.style.removeProperty("visibility");
                    self1.calendarContainer.style.removeProperty("display");
                }
            });
        }
        /**
         * The handler for all events targeting the time inputs
         */ function updateTime(e) {
            if (self1.selectedDates.length === 0) {
                var defaultDate = self1.config.minDate === undefined || compareDates(new Date(), self1.config.minDate) >= 0 ? new Date() : new Date(self1.config.minDate.getTime());
                var defaults = getDefaultHours(self1.config);
                defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
                self1.selectedDates = [
                    defaultDate
                ];
                self1.latestSelectedDateObj = defaultDate;
            }
            if (e !== undefined && e.type !== "blur") timeWrapper(e);
            var prevValue = self1._input.value;
            setHoursFromInputs();
            updateValue();
            if (self1._input.value !== prevValue) self1._debouncedChange();
        }
        function ampm2military(hour, amPM) {
            return hour % 12 + 12 * int(amPM === self1.l10n.amPM[1]);
        }
        function military2ampm(hour) {
            switch(hour % 24){
                case 0:
                case 12:
                    return 12;
                default:
                    return hour % 12;
            }
        }
        /**
         * Syncs the selected date object time with user's time input
         */ function setHoursFromInputs() {
            if (self1.hourElement === undefined || self1.minuteElement === undefined) return;
            var hours = (parseInt(self1.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self1.minuteElement.value, 10) || 0) % 60, seconds = self1.secondElement !== undefined ? (parseInt(self1.secondElement.value, 10) || 0) % 60 : 0;
            if (self1.amPM !== undefined) hours = ampm2military(hours, self1.amPM.textContent);
            var limitMinHours = self1.config.minTime !== undefined || self1.config.minDate && self1.minDateHasTime && self1.latestSelectedDateObj && compareDates(self1.latestSelectedDateObj, self1.config.minDate, true) === 0;
            var limitMaxHours = self1.config.maxTime !== undefined || self1.config.maxDate && self1.maxDateHasTime && self1.latestSelectedDateObj && compareDates(self1.latestSelectedDateObj, self1.config.maxDate, true) === 0;
            if (self1.config.maxTime !== undefined && self1.config.minTime !== undefined && self1.config.minTime > self1.config.maxTime) {
                var minBound = calculateSecondsSinceMidnight(self1.config.minTime.getHours(), self1.config.minTime.getMinutes(), self1.config.minTime.getSeconds());
                var maxBound = calculateSecondsSinceMidnight(self1.config.maxTime.getHours(), self1.config.maxTime.getMinutes(), self1.config.maxTime.getSeconds());
                var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
                if (currentTime > maxBound && currentTime < minBound) {
                    var result = parseSeconds(minBound);
                    hours = result[0];
                    minutes = result[1];
                    seconds = result[2];
                }
            } else {
                if (limitMaxHours) {
                    var maxTime = self1.config.maxTime !== undefined ? self1.config.maxTime : self1.config.maxDate;
                    hours = Math.min(hours, maxTime.getHours());
                    if (hours === maxTime.getHours()) minutes = Math.min(minutes, maxTime.getMinutes());
                    if (minutes === maxTime.getMinutes()) seconds = Math.min(seconds, maxTime.getSeconds());
                }
                if (limitMinHours) {
                    var minTime = self1.config.minTime !== undefined ? self1.config.minTime : self1.config.minDate;
                    hours = Math.max(hours, minTime.getHours());
                    if (hours === minTime.getHours() && minutes < minTime.getMinutes()) minutes = minTime.getMinutes();
                    if (minutes === minTime.getMinutes()) seconds = Math.max(seconds, minTime.getSeconds());
                }
            }
            setHours(hours, minutes, seconds);
        }
        /**
         * Syncs time input values with a date
         */ function setHoursFromDate(dateObj) {
            var date = dateObj || self1.latestSelectedDateObj;
            if (date && date instanceof Date) setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
        /**
         * Sets the hours, minutes, and optionally seconds
         * of the latest selected date object and the
         * corresponding time inputs
         * @param {Number} hours the hour. whether its military
         *                 or am-pm gets inferred from config
         * @param {Number} minutes the minutes
         * @param {Number} seconds the seconds (optional)
         */ function setHours(hours, minutes, seconds) {
            if (self1.latestSelectedDateObj !== undefined) self1.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            if (!self1.hourElement || !self1.minuteElement || self1.isMobile) return;
            self1.hourElement.value = pad(!self1.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
            self1.minuteElement.value = pad(minutes);
            if (self1.amPM !== undefined) self1.amPM.textContent = self1.l10n.amPM[int(hours >= 12)];
            if (self1.secondElement !== undefined) self1.secondElement.value = pad(seconds);
        }
        /**
         * Handles the year input and incrementing events
         * @param {Event} event the keyup or increment event
         */ function onYearInput(event) {
            var eventTarget = getEventTarget(event);
            var year = parseInt(eventTarget.value) + (event.delta || 0);
            if (year / 1000 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) changeYear(year);
        }
        /**
         * Essentially addEventListener + tracking
         * @param {Element} element the element to addEventListener to
         * @param {String} event the event name
         * @param {Function} handler the event handler
         */ function bind(element, event, handler, options) {
            if (event instanceof Array) return event.forEach(function(ev) {
                return bind(element, ev, handler, options);
            });
            if (element instanceof Array) return element.forEach(function(el) {
                return bind(el, event, handler, options);
            });
            element.addEventListener(event, handler, options);
            self1._handlers.push({
                remove: function() {
                    return element.removeEventListener(event, handler, options);
                }
            });
        }
        function triggerChange() {
            triggerEvent("onChange");
        }
        /**
         * Adds all the necessary event listeners
         */ function bindEvents() {
            if (self1.config.wrap) [
                "open",
                "close",
                "toggle",
                "clear"
            ].forEach(function(evt) {
                Array.prototype.forEach.call(self1.element.querySelectorAll("[data-" + evt + "]"), function(el) {
                    return bind(el, "click", self1[evt]);
                });
            });
            if (self1.isMobile) {
                setupMobile();
                return;
            }
            var debouncedResize = debounce(onResize, 50);
            self1._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
            if (self1.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) bind(self1.daysContainer, "mouseover", function(e) {
                if (self1.config.mode === "range") onMouseOver(getEventTarget(e));
            });
            bind(self1._input, "keydown", onKeyDown);
            if (self1.calendarContainer !== undefined) bind(self1.calendarContainer, "keydown", onKeyDown);
            if (!self1.config.inline && !self1.config.static) bind(window, "resize", debouncedResize);
            if (window.ontouchstart !== undefined) bind(window.document, "touchstart", documentClick);
            else bind(window.document, "mousedown", documentClick);
            bind(window.document, "focus", documentClick, {
                capture: true
            });
            if (self1.config.clickOpens === true) {
                bind(self1._input, "focus", self1.open);
                bind(self1._input, "click", self1.open);
            }
            if (self1.daysContainer !== undefined) {
                bind(self1.monthNav, "click", onMonthNavClick);
                bind(self1.monthNav, [
                    "keyup",
                    "increment"
                ], onYearInput);
                bind(self1.daysContainer, "click", selectDate);
            }
            if (self1.timeContainer !== undefined && self1.minuteElement !== undefined && self1.hourElement !== undefined) {
                var selText = function(e) {
                    return getEventTarget(e).select();
                };
                bind(self1.timeContainer, [
                    "increment"
                ], updateTime);
                bind(self1.timeContainer, "blur", updateTime, {
                    capture: true
                });
                bind(self1.timeContainer, "click", timeIncrement);
                bind([
                    self1.hourElement,
                    self1.minuteElement
                ], [
                    "focus",
                    "click"
                ], selText);
                if (self1.secondElement !== undefined) bind(self1.secondElement, "focus", function() {
                    return self1.secondElement && self1.secondElement.select();
                });
                if (self1.amPM !== undefined) bind(self1.amPM, "click", function(e) {
                    updateTime(e);
                });
            }
            if (self1.config.allowInput) bind(self1._input, "blur", onBlur);
        }
        /**
         * Set the calendar view to a particular date.
         * @param {Date} jumpDate the date to set the view to
         * @param {boolean} triggerChange if change events should be triggered
         */ function jumpToDate(jumpDate, triggerChange) {
            var jumpTo = jumpDate !== undefined ? self1.parseDate(jumpDate) : self1.latestSelectedDateObj || (self1.config.minDate && self1.config.minDate > self1.now ? self1.config.minDate : self1.config.maxDate && self1.config.maxDate < self1.now ? self1.config.maxDate : self1.now);
            var oldYear = self1.currentYear;
            var oldMonth = self1.currentMonth;
            try {
                if (jumpTo !== undefined) {
                    self1.currentYear = jumpTo.getFullYear();
                    self1.currentMonth = jumpTo.getMonth();
                }
            } catch (e) {
                /* istanbul ignore next */ e.message = "Invalid date supplied: " + jumpTo;
                self1.config.errorHandler(e);
            }
            if (triggerChange && self1.currentYear !== oldYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            if (triggerChange && (self1.currentYear !== oldYear || self1.currentMonth !== oldMonth)) triggerEvent("onMonthChange");
            self1.redraw();
        }
        /**
         * The up/down arrow handler for time inputs
         * @param {Event} e the click event
         */ function timeIncrement(e) {
            var eventTarget = getEventTarget(e);
            if (~eventTarget.className.indexOf("arrow")) incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
        }
        /**
         * Increments/decrements the value of input associ-
         * ated with the up/down arrow by dispatching an
         * "increment" event on the input.
         *
         * @param {Event} e the click event
         * @param {Number} delta the diff (usually 1 or -1)
         * @param {Element} inputElem the input element
         */ function incrementNumInput(e, delta, inputElem) {
            var target = e && getEventTarget(e);
            var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }
        function build() {
            var fragment = window.document.createDocumentFragment();
            self1.calendarContainer = createElement("div", "flatpickr-calendar");
            self1.calendarContainer.tabIndex = -1;
            if (!self1.config.noCalendar) {
                fragment.appendChild(buildMonthNav());
                self1.innerContainer = createElement("div", "flatpickr-innerContainer");
                if (self1.config.weekNumbers) {
                    var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                    self1.innerContainer.appendChild(weekWrapper);
                    self1.weekNumbers = weekNumbers;
                    self1.weekWrapper = weekWrapper;
                }
                self1.rContainer = createElement("div", "flatpickr-rContainer");
                self1.rContainer.appendChild(buildWeekdays());
                if (!self1.daysContainer) {
                    self1.daysContainer = createElement("div", "flatpickr-days");
                    self1.daysContainer.tabIndex = -1;
                }
                buildDays();
                self1.rContainer.appendChild(self1.daysContainer);
                self1.innerContainer.appendChild(self1.rContainer);
                fragment.appendChild(self1.innerContainer);
            }
            if (self1.config.enableTime) fragment.appendChild(buildTime());
            toggleClass(self1.calendarContainer, "rangeMode", self1.config.mode === "range");
            toggleClass(self1.calendarContainer, "animate", self1.config.animate === true);
            toggleClass(self1.calendarContainer, "multiMonth", self1.config.showMonths > 1);
            self1.calendarContainer.appendChild(fragment);
            var customAppend = self1.config.appendTo !== undefined && self1.config.appendTo.nodeType !== undefined;
            if (self1.config.inline || self1.config.static) {
                self1.calendarContainer.classList.add(self1.config.inline ? "inline" : "static");
                if (self1.config.inline) {
                    if (!customAppend && self1.element.parentNode) self1.element.parentNode.insertBefore(self1.calendarContainer, self1._input.nextSibling);
                    else if (self1.config.appendTo !== undefined) self1.config.appendTo.appendChild(self1.calendarContainer);
                }
                if (self1.config.static) {
                    var wrapper = createElement("div", "flatpickr-wrapper");
                    if (self1.element.parentNode) self1.element.parentNode.insertBefore(wrapper, self1.element);
                    wrapper.appendChild(self1.element);
                    if (self1.altInput) wrapper.appendChild(self1.altInput);
                    wrapper.appendChild(self1.calendarContainer);
                }
            }
            if (!self1.config.static && !self1.config.inline) (self1.config.appendTo !== undefined ? self1.config.appendTo : window.document.body).appendChild(self1.calendarContainer);
        }
        function createDay(className, date, _dayNumber, i) {
            var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
            dayElement.dateObj = date;
            dayElement.$i = i;
            dayElement.setAttribute("aria-label", self1.formatDate(date, self1.config.ariaDateFormat));
            if (className.indexOf("hidden") === -1 && compareDates(date, self1.now) === 0) {
                self1.todayDateElem = dayElement;
                dayElement.classList.add("today");
                dayElement.setAttribute("aria-current", "date");
            }
            if (dateIsEnabled) {
                dayElement.tabIndex = -1;
                if (isDateSelected(date)) {
                    dayElement.classList.add("selected");
                    self1.selectedDateElem = dayElement;
                    if (self1.config.mode === "range") {
                        toggleClass(dayElement, "startRange", self1.selectedDates[0] && compareDates(date, self1.selectedDates[0], true) === 0);
                        toggleClass(dayElement, "endRange", self1.selectedDates[1] && compareDates(date, self1.selectedDates[1], true) === 0);
                        if (className === "nextMonthDay") dayElement.classList.add("inRange");
                    }
                }
            } else dayElement.classList.add("flatpickr-disabled");
            if (self1.config.mode === "range") {
                if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");
            }
            if (self1.weekNumbers && self1.config.showMonths === 1 && className !== "prevMonthDay" && i % 7 === 6) self1.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self1.config.getWeek(date) + "</span>");
            triggerEvent("onDayCreate", dayElement);
            return dayElement;
        }
        function focusOnDayElem(targetNode) {
            targetNode.focus();
            if (self1.config.mode === "range") onMouseOver(targetNode);
        }
        function getFirstAvailableDay(delta) {
            var startMonth = delta > 0 ? 0 : self1.config.showMonths - 1;
            var endMonth = delta > 0 ? self1.config.showMonths : -1;
            for(var m = startMonth; m != endMonth; m += delta){
                var month = self1.daysContainer.children[m];
                var startIndex = delta > 0 ? 0 : month.children.length - 1;
                var endIndex = delta > 0 ? month.children.length : -1;
                for(var i = startIndex; i != endIndex; i += delta){
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj)) return c;
                }
            }
            return undefined;
        }
        function getNextAvailableDay(current, delta) {
            var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self1.currentMonth;
            var endMonth = delta > 0 ? self1.config.showMonths : -1;
            var loopDelta = delta > 0 ? 1 : -1;
            for(var m = givenMonth - self1.currentMonth; m != endMonth; m += loopDelta){
                var month = self1.daysContainer.children[m];
                var startIndex = givenMonth - self1.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
                var numMonthDays = month.children.length;
                for(var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta){
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta)) return focusOnDayElem(c);
                }
            }
            self1.changeMonth(loopDelta);
            focusOnDay(getFirstAvailableDay(loopDelta), 0);
            return undefined;
        }
        function focusOnDay(current, offset) {
            var activeElement = getClosestActiveElement();
            var dayFocused = isInView(activeElement || document.body);
            var startElem = current !== undefined ? current : dayFocused ? activeElement : self1.selectedDateElem !== undefined && isInView(self1.selectedDateElem) ? self1.selectedDateElem : self1.todayDateElem !== undefined && isInView(self1.todayDateElem) ? self1.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
            if (startElem === undefined) self1._input.focus();
            else if (!dayFocused) focusOnDayElem(startElem);
            else getNextAvailableDay(startElem, offset);
        }
        function buildMonthDays(year, month) {
            var firstOfMonth = (new Date(year, month, 1).getDay() - self1.l10n.firstDayOfWeek + 7) % 7;
            var prevMonthDays = self1.utils.getDaysInMonth((month - 1 + 12) % 12, year);
            var daysInMonth = self1.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self1.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
            var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
            // prepend days from the ending of previous month
            for(; dayNumber <= prevMonthDays; dayNumber++, dayIndex++)days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
            // Start at 1 since there is no 0th day
            for(dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++)days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
            // append days from the next month
            for(var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self1.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++)days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
            //updateNavigationCurrentMonth();
            var dayContainer = createElement("div", "dayContainer");
            dayContainer.appendChild(days);
            return dayContainer;
        }
        function buildDays() {
            if (self1.daysContainer === undefined) return;
            clearNode(self1.daysContainer);
            // TODO: week numbers for each month
            if (self1.weekNumbers) clearNode(self1.weekNumbers);
            var frag = document.createDocumentFragment();
            for(var i = 0; i < self1.config.showMonths; i++){
                var d = new Date(self1.currentYear, self1.currentMonth, 1);
                d.setMonth(self1.currentMonth + i);
                frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
            }
            self1.daysContainer.appendChild(frag);
            self1.days = self1.daysContainer.firstChild;
            if (self1.config.mode === "range" && self1.selectedDates.length === 1) onMouseOver();
        }
        function buildMonthSwitch() {
            if (self1.config.showMonths > 1 || self1.config.monthSelectorType !== "dropdown") return;
            var shouldBuildMonth = function(month) {
                if (self1.config.minDate !== undefined && self1.currentYear === self1.config.minDate.getFullYear() && month < self1.config.minDate.getMonth()) return false;
                return !(self1.config.maxDate !== undefined && self1.currentYear === self1.config.maxDate.getFullYear() && month > self1.config.maxDate.getMonth());
            };
            self1.monthsDropdownContainer.tabIndex = -1;
            self1.monthsDropdownContainer.innerHTML = "";
            for(var i = 0; i < 12; i++){
                if (!shouldBuildMonth(i)) continue;
                var month = createElement("option", "flatpickr-monthDropdown-month");
                month.value = new Date(self1.currentYear, i).getMonth().toString();
                month.textContent = monthToStr(i, self1.config.shorthandCurrentMonth, self1.l10n);
                month.tabIndex = -1;
                if (self1.currentMonth === i) month.selected = true;
                self1.monthsDropdownContainer.appendChild(month);
            }
        }
        function buildMonth() {
            var container = createElement("div", "flatpickr-month");
            var monthNavFragment = window.document.createDocumentFragment();
            var monthElement;
            if (self1.config.showMonths > 1 || self1.config.monthSelectorType === "static") monthElement = createElement("span", "cur-month");
            else {
                self1.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                self1.monthsDropdownContainer.setAttribute("aria-label", self1.l10n.monthAriaLabel);
                bind(self1.monthsDropdownContainer, "change", function(e) {
                    var target = getEventTarget(e);
                    var selectedMonth = parseInt(target.value, 10);
                    self1.changeMonth(selectedMonth - self1.currentMonth);
                    triggerEvent("onMonthChange");
                });
                buildMonthSwitch();
                monthElement = self1.monthsDropdownContainer;
            }
            var yearInput = createNumberInput("cur-year", {
                tabindex: "-1"
            });
            var yearElement = yearInput.getElementsByTagName("input")[0];
            yearElement.setAttribute("aria-label", self1.l10n.yearAriaLabel);
            if (self1.config.minDate) yearElement.setAttribute("min", self1.config.minDate.getFullYear().toString());
            if (self1.config.maxDate) {
                yearElement.setAttribute("max", self1.config.maxDate.getFullYear().toString());
                yearElement.disabled = !!self1.config.minDate && self1.config.minDate.getFullYear() === self1.config.maxDate.getFullYear();
            }
            var currentMonth = createElement("div", "flatpickr-current-month");
            currentMonth.appendChild(monthElement);
            currentMonth.appendChild(yearInput);
            monthNavFragment.appendChild(currentMonth);
            container.appendChild(monthNavFragment);
            return {
                container: container,
                yearElement: yearElement,
                monthElement: monthElement
            };
        }
        function buildMonths() {
            clearNode(self1.monthNav);
            self1.monthNav.appendChild(self1.prevMonthNav);
            if (self1.config.showMonths) {
                self1.yearElements = [];
                self1.monthElements = [];
            }
            for(var m = self1.config.showMonths; m--;){
                var month = buildMonth();
                self1.yearElements.push(month.yearElement);
                self1.monthElements.push(month.monthElement);
                self1.monthNav.appendChild(month.container);
            }
            self1.monthNav.appendChild(self1.nextMonthNav);
        }
        function buildMonthNav() {
            self1.monthNav = createElement("div", "flatpickr-months");
            self1.yearElements = [];
            self1.monthElements = [];
            self1.prevMonthNav = createElement("span", "flatpickr-prev-month");
            self1.prevMonthNav.innerHTML = self1.config.prevArrow;
            self1.nextMonthNav = createElement("span", "flatpickr-next-month");
            self1.nextMonthNav.innerHTML = self1.config.nextArrow;
            buildMonths();
            Object.defineProperty(self1, "_hidePrevMonthArrow", {
                get: function() {
                    return self1.__hidePrevMonthArrow;
                },
                set: function(bool) {
                    if (self1.__hidePrevMonthArrow !== bool) {
                        toggleClass(self1.prevMonthNav, "flatpickr-disabled", bool);
                        self1.__hidePrevMonthArrow = bool;
                    }
                }
            });
            Object.defineProperty(self1, "_hideNextMonthArrow", {
                get: function() {
                    return self1.__hideNextMonthArrow;
                },
                set: function(bool) {
                    if (self1.__hideNextMonthArrow !== bool) {
                        toggleClass(self1.nextMonthNav, "flatpickr-disabled", bool);
                        self1.__hideNextMonthArrow = bool;
                    }
                }
            });
            self1.currentYearElement = self1.yearElements[0];
            updateNavigationCurrentMonth();
            return self1.monthNav;
        }
        function buildTime() {
            self1.calendarContainer.classList.add("hasTime");
            if (self1.config.noCalendar) self1.calendarContainer.classList.add("noCalendar");
            var defaults = getDefaultHours(self1.config);
            self1.timeContainer = createElement("div", "flatpickr-time");
            self1.timeContainer.tabIndex = -1;
            var separator = createElement("span", "flatpickr-time-separator", ":");
            var hourInput = createNumberInput("flatpickr-hour", {
                "aria-label": self1.l10n.hourAriaLabel
            });
            self1.hourElement = hourInput.getElementsByTagName("input")[0];
            var minuteInput = createNumberInput("flatpickr-minute", {
                "aria-label": self1.l10n.minuteAriaLabel
            });
            self1.minuteElement = minuteInput.getElementsByTagName("input")[0];
            self1.hourElement.tabIndex = self1.minuteElement.tabIndex = -1;
            self1.hourElement.value = pad(self1.latestSelectedDateObj ? self1.latestSelectedDateObj.getHours() : self1.config.time_24hr ? defaults.hours : military2ampm(defaults.hours));
            self1.minuteElement.value = pad(self1.latestSelectedDateObj ? self1.latestSelectedDateObj.getMinutes() : defaults.minutes);
            self1.hourElement.setAttribute("step", self1.config.hourIncrement.toString());
            self1.minuteElement.setAttribute("step", self1.config.minuteIncrement.toString());
            self1.hourElement.setAttribute("min", self1.config.time_24hr ? "0" : "1");
            self1.hourElement.setAttribute("max", self1.config.time_24hr ? "23" : "12");
            self1.hourElement.setAttribute("maxlength", "2");
            self1.minuteElement.setAttribute("min", "0");
            self1.minuteElement.setAttribute("max", "59");
            self1.minuteElement.setAttribute("maxlength", "2");
            self1.timeContainer.appendChild(hourInput);
            self1.timeContainer.appendChild(separator);
            self1.timeContainer.appendChild(minuteInput);
            if (self1.config.time_24hr) self1.timeContainer.classList.add("time24hr");
            if (self1.config.enableSeconds) {
                self1.timeContainer.classList.add("hasSeconds");
                var secondInput = createNumberInput("flatpickr-second");
                self1.secondElement = secondInput.getElementsByTagName("input")[0];
                self1.secondElement.value = pad(self1.latestSelectedDateObj ? self1.latestSelectedDateObj.getSeconds() : defaults.seconds);
                self1.secondElement.setAttribute("step", self1.minuteElement.getAttribute("step"));
                self1.secondElement.setAttribute("min", "0");
                self1.secondElement.setAttribute("max", "59");
                self1.secondElement.setAttribute("maxlength", "2");
                self1.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                self1.timeContainer.appendChild(secondInput);
            }
            if (!self1.config.time_24hr) {
                // add self.amPM if appropriate
                self1.amPM = createElement("span", "flatpickr-am-pm", self1.l10n.amPM[int((self1.latestSelectedDateObj ? self1.hourElement.value : self1.config.defaultHour) > 11)]);
                self1.amPM.title = self1.l10n.toggleTitle;
                self1.amPM.tabIndex = -1;
                self1.timeContainer.appendChild(self1.amPM);
            }
            return self1.timeContainer;
        }
        function buildWeekdays() {
            if (!self1.weekdayContainer) self1.weekdayContainer = createElement("div", "flatpickr-weekdays");
            else clearNode(self1.weekdayContainer);
            for(var i = self1.config.showMonths; i--;){
                var container = createElement("div", "flatpickr-weekdaycontainer");
                self1.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self1.weekdayContainer;
        }
        function updateWeekdays() {
            if (!self1.weekdayContainer) return;
            var firstDayOfWeek = self1.l10n.firstDayOfWeek;
            var weekdays = __spreadArrays(self1.l10n.weekdays.shorthand);
            if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
            for(var i = self1.config.showMonths; i--;)self1.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
        }
        /* istanbul ignore next */ function buildWeeks() {
            self1.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = createElement("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self1.l10n.weekAbbreviation));
            var weekNumbers = createElement("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper: weekWrapper,
                weekNumbers: weekNumbers
            };
        }
        function changeMonth(value, isOffset) {
            if (isOffset === void 0) isOffset = true;
            var delta = isOffset ? value : value - self1.currentMonth;
            if (delta < 0 && self1._hidePrevMonthArrow === true || delta > 0 && self1._hideNextMonthArrow === true) return;
            self1.currentMonth += delta;
            if (self1.currentMonth < 0 || self1.currentMonth > 11) {
                self1.currentYear += self1.currentMonth > 11 ? 1 : -1;
                self1.currentMonth = (self1.currentMonth + 12) % 12;
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            buildDays();
            triggerEvent("onMonthChange");
            updateNavigationCurrentMonth();
        }
        function clear(triggerChangeEvent, toInitial) {
            if (triggerChangeEvent === void 0) triggerChangeEvent = true;
            if (toInitial === void 0) toInitial = true;
            self1.input.value = "";
            if (self1.altInput !== undefined) self1.altInput.value = "";
            if (self1.mobileInput !== undefined) self1.mobileInput.value = "";
            self1.selectedDates = [];
            self1.latestSelectedDateObj = undefined;
            if (toInitial === true) {
                self1.currentYear = self1._initialDate.getFullYear();
                self1.currentMonth = self1._initialDate.getMonth();
            }
            if (self1.config.enableTime === true) {
                var _a = getDefaultHours(self1.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                setHours(hours, minutes, seconds);
            }
            self1.redraw();
            if (triggerChangeEvent) // triggerChangeEvent is true (default) or an Event
            triggerEvent("onChange");
        }
        function close() {
            self1.isOpen = false;
            if (!self1.isMobile) {
                if (self1.calendarContainer !== undefined) self1.calendarContainer.classList.remove("open");
                if (self1._input !== undefined) self1._input.classList.remove("active");
            }
            triggerEvent("onClose");
        }
        function destroy() {
            if (self1.config !== undefined) triggerEvent("onDestroy");
            for(var i = self1._handlers.length; i--;)self1._handlers[i].remove();
            self1._handlers = [];
            if (self1.mobileInput) {
                if (self1.mobileInput.parentNode) self1.mobileInput.parentNode.removeChild(self1.mobileInput);
                self1.mobileInput = undefined;
            } else if (self1.calendarContainer && self1.calendarContainer.parentNode) {
                if (self1.config.static && self1.calendarContainer.parentNode) {
                    var wrapper = self1.calendarContainer.parentNode;
                    wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                    if (wrapper.parentNode) {
                        while(wrapper.firstChild)wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                        wrapper.parentNode.removeChild(wrapper);
                    }
                } else self1.calendarContainer.parentNode.removeChild(self1.calendarContainer);
            }
            if (self1.altInput) {
                self1.input.type = "text";
                if (self1.altInput.parentNode) self1.altInput.parentNode.removeChild(self1.altInput);
                delete self1.altInput;
            }
            if (self1.input) {
                self1.input.type = self1.input._type;
                self1.input.classList.remove("flatpickr-input");
                self1.input.removeAttribute("readonly");
            }
            [
                "_showTimeInput",
                "latestSelectedDateObj",
                "_hideNextMonthArrow",
                "_hidePrevMonthArrow",
                "__hideNextMonthArrow",
                "__hidePrevMonthArrow",
                "isMobile",
                "isOpen",
                "selectedDateElem",
                "minDateHasTime",
                "maxDateHasTime",
                "days",
                "daysContainer",
                "_input",
                "_positionElement",
                "innerContainer",
                "rContainer",
                "monthNav",
                "todayDateElem",
                "calendarContainer",
                "weekdayContainer",
                "prevMonthNav",
                "nextMonthNav",
                "monthsDropdownContainer",
                "currentMonthElement",
                "currentYearElement",
                "navigationCurrentMonth",
                "selectedDateElem",
                "config"
            ].forEach(function(k) {
                try {
                    delete self1[k];
                } catch (_) {}
            });
        }
        function isCalendarElem(elem) {
            return self1.calendarContainer.contains(elem);
        }
        function documentClick(e) {
            if (self1.isOpen && !self1.config.inline) {
                var eventTarget_1 = getEventTarget(e);
                var isCalendarElement = isCalendarElem(eventTarget_1);
                var isInput = eventTarget_1 === self1.input || eventTarget_1 === self1.altInput || self1.element.contains(eventTarget_1) || // web components
                // e.path is not present in all browsers. circumventing typechecks
                e.path && e.path.indexOf && (~e.path.indexOf(self1.input) || ~e.path.indexOf(self1.altInput));
                var lostFocus = !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
                var isIgnored = !self1.config.ignoredFocusElements.some(function(elem) {
                    return elem.contains(eventTarget_1);
                });
                if (lostFocus && isIgnored) {
                    if (self1.config.allowInput) self1.setDate(self1._input.value, false, self1.config.altInput ? self1.config.altFormat : self1.config.dateFormat);
                    if (self1.timeContainer !== undefined && self1.minuteElement !== undefined && self1.hourElement !== undefined && self1.input.value !== "" && self1.input.value !== undefined) updateTime();
                    self1.close();
                    if (self1.config && self1.config.mode === "range" && self1.selectedDates.length === 1) self1.clear(false);
                }
            }
        }
        function changeYear(newYear) {
            if (!newYear || self1.config.minDate && newYear < self1.config.minDate.getFullYear() || self1.config.maxDate && newYear > self1.config.maxDate.getFullYear()) return;
            var newYearNum = newYear, isNewYear = self1.currentYear !== newYearNum;
            self1.currentYear = newYearNum || self1.currentYear;
            if (self1.config.maxDate && self1.currentYear === self1.config.maxDate.getFullYear()) self1.currentMonth = Math.min(self1.config.maxDate.getMonth(), self1.currentMonth);
            else if (self1.config.minDate && self1.currentYear === self1.config.minDate.getFullYear()) self1.currentMonth = Math.max(self1.config.minDate.getMonth(), self1.currentMonth);
            if (isNewYear) {
                self1.redraw();
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
        }
        function isEnabled(date, timeless) {
            var _a;
            if (timeless === void 0) timeless = true;
            var dateToCheck = self1.parseDate(date, undefined, timeless); // timeless
            if (self1.config.minDate && dateToCheck && compareDates(dateToCheck, self1.config.minDate, timeless !== undefined ? timeless : !self1.minDateHasTime) < 0 || self1.config.maxDate && dateToCheck && compareDates(dateToCheck, self1.config.maxDate, timeless !== undefined ? timeless : !self1.maxDateHasTime) > 0) return false;
            if (!self1.config.enable && self1.config.disable.length === 0) return true;
            if (dateToCheck === undefined) return false;
            var bool = !!self1.config.enable, array = (_a = self1.config.enable) !== null && _a !== void 0 ? _a : self1.config.disable;
            for(var i = 0, d = void 0; i < array.length; i++){
                d = array[i];
                if (typeof d === "function" && d(dateToCheck) // disabled by function
                ) return bool;
                else if (d instanceof Date && dateToCheck !== undefined && d.getTime() === dateToCheck.getTime()) // disabled by date
                return bool;
                else if (typeof d === "string") {
                    // disabled by date string
                    var parsed = self1.parseDate(d, undefined, true);
                    return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
                } else if (// disabled by range
                typeof d === "object" && dateToCheck !== undefined && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime()) return bool;
            }
            return !bool;
        }
        function isInView(elem) {
            if (self1.daysContainer !== undefined) return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self1.daysContainer.contains(elem);
            return false;
        }
        function onBlur(e) {
            var isInput = e.target === self1._input;
            var valueChanged = self1._input.value.trimEnd() !== getDateStr();
            if (isInput && valueChanged && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) self1.setDate(self1._input.value, true, e.target === self1.altInput ? self1.config.altFormat : self1.config.dateFormat);
        }
        function onKeyDown(e) {
            // e.key                      e.keyCode
            // "Backspace"                        8
            // "Tab"                              9
            // "Enter"                           13
            // "Escape"     (IE "Esc")           27
            // "ArrowLeft"  (IE "Left")          37
            // "ArrowUp"    (IE "Up")            38
            // "ArrowRight" (IE "Right")         39
            // "ArrowDown"  (IE "Down")          40
            // "Delete"     (IE "Del")           46
            var eventTarget = getEventTarget(e);
            var isInput = self1.config.wrap ? element.contains(eventTarget) : eventTarget === self1._input;
            var allowInput = self1.config.allowInput;
            var allowKeydown = self1.isOpen && (!allowInput || !isInput);
            var allowInlineKeydown = self1.config.inline && isInput && !allowInput;
            if (e.keyCode === 13 && isInput) {
                if (allowInput) {
                    self1.setDate(self1._input.value, true, eventTarget === self1.altInput ? self1.config.altFormat : self1.config.dateFormat);
                    self1.close();
                    return eventTarget.blur();
                } else self1.open();
            } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
                var isTimeObj = !!self1.timeContainer && self1.timeContainer.contains(eventTarget);
                switch(e.keyCode){
                    case 13:
                        if (isTimeObj) {
                            e.preventDefault();
                            updateTime();
                            focusAndClose();
                        } else selectDate(e);
                        break;
                    case 27:
                        e.preventDefault();
                        focusAndClose();
                        break;
                    case 8:
                    case 46:
                        if (isInput && !self1.config.allowInput) {
                            e.preventDefault();
                            self1.clear();
                        }
                        break;
                    case 37:
                    case 39:
                        if (!isTimeObj && !isInput) {
                            e.preventDefault();
                            var activeElement = getClosestActiveElement();
                            if (self1.daysContainer !== undefined && (allowInput === false || activeElement && isInView(activeElement))) {
                                var delta_1 = e.keyCode === 39 ? 1 : -1;
                                if (!e.ctrlKey) focusOnDay(undefined, delta_1);
                                else {
                                    e.stopPropagation();
                                    changeMonth(delta_1);
                                    focusOnDay(getFirstAvailableDay(1), 0);
                                }
                            }
                        } else if (self1.hourElement) self1.hourElement.focus();
                        break;
                    case 38:
                    case 40:
                        e.preventDefault();
                        var delta = e.keyCode === 40 ? 1 : -1;
                        if (self1.daysContainer && eventTarget.$i !== undefined || eventTarget === self1.input || eventTarget === self1.altInput) {
                            if (e.ctrlKey) {
                                e.stopPropagation();
                                changeYear(self1.currentYear - delta);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            } else if (!isTimeObj) focusOnDay(undefined, delta * 7);
                        } else if (eventTarget === self1.currentYearElement) changeYear(self1.currentYear - delta);
                        else if (self1.config.enableTime) {
                            if (!isTimeObj && self1.hourElement) self1.hourElement.focus();
                            updateTime(e);
                            self1._debouncedChange();
                        }
                        break;
                    case 9:
                        if (isTimeObj) {
                            var elems = [
                                self1.hourElement,
                                self1.minuteElement,
                                self1.secondElement,
                                self1.amPM
                            ].concat(self1.pluginElements).filter(function(x) {
                                return x;
                            });
                            var i = elems.indexOf(eventTarget);
                            if (i !== -1) {
                                var target = elems[i + (e.shiftKey ? -1 : 1)];
                                e.preventDefault();
                                (target || self1._input).focus();
                            }
                        } else if (!self1.config.noCalendar && self1.daysContainer && self1.daysContainer.contains(eventTarget) && e.shiftKey) {
                            e.preventDefault();
                            self1._input.focus();
                        }
                        break;
                }
            }
            if (self1.amPM !== undefined && eventTarget === self1.amPM) switch(e.key){
                case self1.l10n.amPM[0].charAt(0):
                case self1.l10n.amPM[0].charAt(0).toLowerCase():
                    self1.amPM.textContent = self1.l10n.amPM[0];
                    setHoursFromInputs();
                    updateValue();
                    break;
                case self1.l10n.amPM[1].charAt(0):
                case self1.l10n.amPM[1].charAt(0).toLowerCase():
                    self1.amPM.textContent = self1.l10n.amPM[1];
                    setHoursFromInputs();
                    updateValue();
                    break;
            }
            if (isInput || isCalendarElem(eventTarget)) triggerEvent("onKeyDown", e);
        }
        function onMouseOver(elem, cellClass) {
            if (cellClass === void 0) cellClass = "flatpickr-day";
            if (self1.selectedDates.length !== 1 || elem && (!elem.classList.contains(cellClass) || elem.classList.contains("flatpickr-disabled"))) return;
            var hoverDate = elem ? elem.dateObj.getTime() : self1.days.firstElementChild.dateObj.getTime(), initialDate = self1.parseDate(self1.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self1.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self1.selectedDates[0].getTime());
            var containsDisabled = false;
            var minRange = 0, maxRange = 0;
            for(var t = rangeStartDate; t < rangeEndDate; t += duration.DAY)if (!isEnabled(new Date(t), true)) {
                containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
                if (t < initialDate && (!minRange || t > minRange)) minRange = t;
                else if (t > initialDate && (!maxRange || t < maxRange)) maxRange = t;
            }
            var hoverableCells = Array.from(self1.rContainer.querySelectorAll("*:nth-child(-n+" + self1.config.showMonths + ") > ." + cellClass));
            hoverableCells.forEach(function(dayElem) {
                var date = dayElem.dateObj;
                var timestamp = date.getTime();
                var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
                if (outOfRange) {
                    dayElem.classList.add("notAllowed");
                    [
                        "inRange",
                        "startRange",
                        "endRange"
                    ].forEach(function(c) {
                        dayElem.classList.remove(c);
                    });
                    return;
                } else if (containsDisabled && !outOfRange) return;
                [
                    "startRange",
                    "inRange",
                    "endRange",
                    "notAllowed"
                ].forEach(function(c) {
                    dayElem.classList.remove(c);
                });
                if (elem !== undefined) {
                    elem.classList.add(hoverDate <= self1.selectedDates[0].getTime() ? "startRange" : "endRange");
                    if (initialDate < hoverDate && timestamp === initialDate) dayElem.classList.add("startRange");
                    else if (initialDate > hoverDate && timestamp === initialDate) dayElem.classList.add("endRange");
                    if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate)) dayElem.classList.add("inRange");
                }
            });
        }
        function onResize() {
            if (self1.isOpen && !self1.config.static && !self1.config.inline) positionCalendar();
        }
        function open(e, positionElement) {
            if (positionElement === void 0) positionElement = self1._positionElement;
            if (self1.isMobile === true) {
                if (e) {
                    e.preventDefault();
                    var eventTarget = getEventTarget(e);
                    if (eventTarget) eventTarget.blur();
                }
                if (self1.mobileInput !== undefined) {
                    self1.mobileInput.focus();
                    self1.mobileInput.click();
                }
                triggerEvent("onOpen");
                return;
            } else if (self1._input.disabled || self1.config.inline) return;
            var wasOpen = self1.isOpen;
            self1.isOpen = true;
            if (!wasOpen) {
                self1.calendarContainer.classList.add("open");
                self1._input.classList.add("active");
                triggerEvent("onOpen");
                positionCalendar(positionElement);
            }
            if (self1.config.enableTime === true && self1.config.noCalendar === true) {
                if (self1.config.allowInput === false && (e === undefined || !self1.timeContainer.contains(e.relatedTarget))) setTimeout(function() {
                    return self1.hourElement.select();
                }, 50);
            }
        }
        function minMaxDateSetter(type) {
            return function(date) {
                var dateObj = self1.config["_" + type + "Date"] = self1.parseDate(date, self1.config.dateFormat);
                var inverseDateObj = self1.config["_" + (type === "min" ? "max" : "min") + "Date"];
                if (dateObj !== undefined) self1[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
                if (self1.selectedDates) {
                    self1.selectedDates = self1.selectedDates.filter(function(d) {
                        return isEnabled(d);
                    });
                    if (!self1.selectedDates.length && type === "min") setHoursFromDate(dateObj);
                    updateValue();
                }
                if (self1.daysContainer) {
                    redraw();
                    if (dateObj !== undefined) self1.currentYearElement[type] = dateObj.getFullYear().toString();
                    else self1.currentYearElement.removeAttribute(type);
                    self1.currentYearElement.disabled = !!inverseDateObj && dateObj !== undefined && inverseDateObj.getFullYear() === dateObj.getFullYear();
                }
            };
        }
        function parseConfig() {
            var boolOpts = [
                "wrap",
                "weekNumbers",
                "allowInput",
                "allowInvalidPreload",
                "clickOpens",
                "time_24hr",
                "enableTime",
                "noCalendar",
                "altInput",
                "shorthandCurrentMonth",
                "inline",
                "static",
                "enableSeconds",
                "disableMobile"
            ];
            var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
            var formats = {};
            self1.config.parseDate = userConfig.parseDate;
            self1.config.formatDate = userConfig.formatDate;
            Object.defineProperty(self1.config, "enable", {
                get: function() {
                    return self1.config._enable;
                },
                set: function(dates) {
                    self1.config._enable = parseDateRules(dates);
                }
            });
            Object.defineProperty(self1.config, "disable", {
                get: function() {
                    return self1.config._disable;
                },
                set: function(dates) {
                    self1.config._disable = parseDateRules(dates);
                }
            });
            var timeMode = userConfig.mode === "time";
            if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                formats.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
            }
            if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
                var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                formats.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
            }
            Object.defineProperty(self1.config, "minDate", {
                get: function() {
                    return self1.config._minDate;
                },
                set: minMaxDateSetter("min")
            });
            Object.defineProperty(self1.config, "maxDate", {
                get: function() {
                    return self1.config._maxDate;
                },
                set: minMaxDateSetter("max")
            });
            var minMaxTimeSetter = function(type) {
                return function(val) {
                    self1.config[type === "min" ? "_minTime" : "_maxTime"] = self1.parseDate(val, "H:i:S");
                };
            };
            Object.defineProperty(self1.config, "minTime", {
                get: function() {
                    return self1.config._minTime;
                },
                set: minMaxTimeSetter("min")
            });
            Object.defineProperty(self1.config, "maxTime", {
                get: function() {
                    return self1.config._maxTime;
                },
                set: minMaxTimeSetter("max")
            });
            if (userConfig.mode === "time") {
                self1.config.noCalendar = true;
                self1.config.enableTime = true;
            }
            Object.assign(self1.config, formats, userConfig);
            for(var i = 0; i < boolOpts.length; i++)// https://github.com/microsoft/TypeScript/issues/31663
            self1.config[boolOpts[i]] = self1.config[boolOpts[i]] === true || self1.config[boolOpts[i]] === "true";
            HOOKS.filter(function(hook) {
                return self1.config[hook] !== undefined;
            }).forEach(function(hook) {
                self1.config[hook] = arrayify(self1.config[hook] || []).map(bindToInstance);
            });
            self1.isMobile = !self1.config.disableMobile && !self1.config.inline && self1.config.mode === "single" && !self1.config.disable.length && !self1.config.enable && !self1.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            for(var i = 0; i < self1.config.plugins.length; i++){
                var pluginConf = self1.config.plugins[i](self1) || {};
                for(var key in pluginConf){
                    if (HOOKS.indexOf(key) > -1) self1.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self1.config[key]);
                    else if (typeof userConfig[key] === "undefined") self1.config[key] = pluginConf[key];
                }
            }
            if (!userConfig.altInputClass) self1.config.altInputClass = getInputElem().className + " " + self1.config.altInputClass;
            triggerEvent("onParseConfig");
        }
        function getInputElem() {
            return self1.config.wrap ? element.querySelector("[data-input]") : element;
        }
        function setupLocale() {
            if (typeof self1.config.locale !== "object" && typeof flatpickr.l10ns[self1.config.locale] === "undefined") self1.config.errorHandler(new Error("flatpickr: invalid locale " + self1.config.locale));
            self1.l10n = __assign(__assign({}, flatpickr.l10ns.default), typeof self1.config.locale === "object" ? self1.config.locale : self1.config.locale !== "default" ? flatpickr.l10ns[self1.config.locale] : undefined);
            tokenRegex.D = "(" + self1.l10n.weekdays.shorthand.join("|") + ")";
            tokenRegex.l = "(" + self1.l10n.weekdays.longhand.join("|") + ")";
            tokenRegex.M = "(" + self1.l10n.months.shorthand.join("|") + ")";
            tokenRegex.F = "(" + self1.l10n.months.longhand.join("|") + ")";
            tokenRegex.K = "(" + self1.l10n.amPM[0] + "|" + self1.l10n.amPM[1] + "|" + self1.l10n.amPM[0].toLowerCase() + "|" + self1.l10n.amPM[1].toLowerCase() + ")";
            var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
            if (userConfig.time_24hr === undefined && flatpickr.defaultConfig.time_24hr === undefined) self1.config.time_24hr = self1.l10n.time_24hr;
            self1.formatDate = createDateFormatter(self1);
            self1.parseDate = createDateParser({
                config: self1.config,
                l10n: self1.l10n
            });
        }
        function positionCalendar(customPositionElement) {
            if (typeof self1.config.position === "function") return void self1.config.position(self1, customPositionElement);
            if (self1.calendarContainer === undefined) return;
            triggerEvent("onPreCalendarPosition");
            var positionElement = customPositionElement || self1._positionElement;
            var calendarHeight = Array.prototype.reduce.call(self1.calendarContainer.children, function(acc, child) {
                return acc + child.offsetHeight;
            }, 0), calendarWidth = self1.calendarContainer.offsetWidth, configPos = self1.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
            var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            toggleClass(self1.calendarContainer, "arrowTop", !showOnTop);
            toggleClass(self1.calendarContainer, "arrowBottom", showOnTop);
            if (self1.config.inline) return;
            var left = window.pageXOffset + inputBounds.left;
            var isCenter = false;
            var isRight = false;
            if (configPosHorizontal === "center") {
                left -= (calendarWidth - inputBounds.width) / 2;
                isCenter = true;
            } else if (configPosHorizontal === "right") {
                left -= calendarWidth - inputBounds.width;
                isRight = true;
            }
            toggleClass(self1.calendarContainer, "arrowLeft", !isCenter && !isRight);
            toggleClass(self1.calendarContainer, "arrowCenter", isCenter);
            toggleClass(self1.calendarContainer, "arrowRight", isRight);
            var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
            var rightMost = left + calendarWidth > window.document.body.offsetWidth;
            var centerMost = right + calendarWidth > window.document.body.offsetWidth;
            toggleClass(self1.calendarContainer, "rightMost", rightMost);
            if (self1.config.static) return;
            self1.calendarContainer.style.top = top + "px";
            if (!rightMost) {
                self1.calendarContainer.style.left = left + "px";
                self1.calendarContainer.style.right = "auto";
            } else if (!centerMost) {
                self1.calendarContainer.style.left = "auto";
                self1.calendarContainer.style.right = right + "px";
            } else {
                var doc = getDocumentStyleSheet();
                // some testing environments don't have css support
                if (doc === undefined) return;
                var bodyWidth = window.document.body.offsetWidth;
                var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                var centerBefore = ".flatpickr-calendar.centerMost:before";
                var centerAfter = ".flatpickr-calendar.centerMost:after";
                var centerIndex = doc.cssRules.length;
                var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                toggleClass(self1.calendarContainer, "rightMost", false);
                toggleClass(self1.calendarContainer, "centerMost", true);
                doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                self1.calendarContainer.style.left = centerLeft + "px";
                self1.calendarContainer.style.right = "auto";
            }
        }
        function getDocumentStyleSheet() {
            var editableSheet = null;
            for(var i = 0; i < document.styleSheets.length; i++){
                var sheet = document.styleSheets[i];
                if (!sheet.cssRules) continue;
                try {
                    sheet.cssRules;
                } catch (err) {
                    continue;
                }
                editableSheet = sheet;
                break;
            }
            return editableSheet != null ? editableSheet : createStyleSheet();
        }
        function createStyleSheet() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        }
        function redraw() {
            if (self1.config.noCalendar || self1.isMobile) return;
            buildMonthSwitch();
            updateNavigationCurrentMonth();
            buildDays();
        }
        function focusAndClose() {
            self1._input.focus();
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== undefined) // hack - bugs in the way IE handles focus keeps the calendar open
            setTimeout(self1.close, 0);
            else self1.close();
        }
        function selectDate(e) {
            e.preventDefault();
            e.stopPropagation();
            var isSelectable = function(day) {
                return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
            };
            var t = findParent(getEventTarget(e), isSelectable);
            if (t === undefined) return;
            var target = t;
            var selectedDate = self1.latestSelectedDateObj = new Date(target.dateObj.getTime());
            var shouldChangeMonth = (selectedDate.getMonth() < self1.currentMonth || selectedDate.getMonth() > self1.currentMonth + self1.config.showMonths - 1) && self1.config.mode !== "range";
            self1.selectedDateElem = target;
            if (self1.config.mode === "single") self1.selectedDates = [
                selectedDate
            ];
            else if (self1.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex) self1.selectedDates.splice(parseInt(selectedIndex), 1);
                else self1.selectedDates.push(selectedDate);
            } else if (self1.config.mode === "range") {
                if (self1.selectedDates.length === 2) self1.clear(false, false);
                self1.latestSelectedDateObj = selectedDate;
                self1.selectedDates.push(selectedDate);
                // unless selecting same date twice, sort ascendingly
                if (compareDates(selectedDate, self1.selectedDates[0], true) !== 0) self1.selectedDates.sort(function(a, b) {
                    return a.getTime() - b.getTime();
                });
            }
            setHoursFromInputs();
            if (shouldChangeMonth) {
                var isNewYear = self1.currentYear !== selectedDate.getFullYear();
                self1.currentYear = selectedDate.getFullYear();
                self1.currentMonth = selectedDate.getMonth();
                if (isNewYear) {
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                triggerEvent("onMonthChange");
            }
            updateNavigationCurrentMonth();
            buildDays();
            updateValue();
            // maintain focus
            if (!shouldChangeMonth && self1.config.mode !== "range" && self1.config.showMonths === 1) focusOnDayElem(target);
            else if (self1.selectedDateElem !== undefined && self1.hourElement === undefined) self1.selectedDateElem && self1.selectedDateElem.focus();
            if (self1.hourElement !== undefined) self1.hourElement !== undefined && self1.hourElement.focus();
            if (self1.config.closeOnSelect) {
                var single = self1.config.mode === "single" && !self1.config.enableTime;
                var range = self1.config.mode === "range" && self1.selectedDates.length === 2 && !self1.config.enableTime;
                if (single || range) focusAndClose();
            }
            triggerChange();
        }
        var CALLBACKS = {
            locale: [
                setupLocale,
                updateWeekdays
            ],
            showMonths: [
                buildMonths,
                setCalendarWidth,
                buildWeekdays
            ],
            minDate: [
                jumpToDate
            ],
            maxDate: [
                jumpToDate
            ],
            positionElement: [
                updatePositionElement
            ],
            clickOpens: [
                function() {
                    if (self1.config.clickOpens === true) {
                        bind(self1._input, "focus", self1.open);
                        bind(self1._input, "click", self1.open);
                    } else {
                        self1._input.removeEventListener("focus", self1.open);
                        self1._input.removeEventListener("click", self1.open);
                    }
                }
            ]
        };
        function set(option, value) {
            if (option !== null && typeof option === "object") {
                Object.assign(self1.config, option);
                for(var key in option)if (CALLBACKS[key] !== undefined) CALLBACKS[key].forEach(function(x) {
                    return x();
                });
            } else {
                self1.config[option] = value;
                if (CALLBACKS[option] !== undefined) CALLBACKS[option].forEach(function(x) {
                    return x();
                });
                else if (HOOKS.indexOf(option) > -1) self1.config[option] = arrayify(value);
            }
            self1.redraw();
            updateValue(true);
        }
        function setSelectedDate(inputDate, format) {
            var dates = [];
            if (inputDate instanceof Array) dates = inputDate.map(function(d) {
                return self1.parseDate(d, format);
            });
            else if (inputDate instanceof Date || typeof inputDate === "number") dates = [
                self1.parseDate(inputDate, format)
            ];
            else if (typeof inputDate === "string") switch(self1.config.mode){
                case "single":
                case "time":
                    dates = [
                        self1.parseDate(inputDate, format)
                    ];
                    break;
                case "multiple":
                    dates = inputDate.split(self1.config.conjunction).map(function(date) {
                        return self1.parseDate(date, format);
                    });
                    break;
                case "range":
                    dates = inputDate.split(self1.l10n.rangeSeparator).map(function(date) {
                        return self1.parseDate(date, format);
                    });
                    break;
            }
            else self1.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
            self1.selectedDates = self1.config.allowInvalidPreload ? dates : dates.filter(function(d) {
                return d instanceof Date && isEnabled(d, false);
            });
            if (self1.config.mode === "range") self1.selectedDates.sort(function(a, b) {
                return a.getTime() - b.getTime();
            });
        }
        function setDate(date, triggerChange, format) {
            if (triggerChange === void 0) triggerChange = false;
            if (format === void 0) format = self1.config.dateFormat;
            if (date !== 0 && !date || date instanceof Array && date.length === 0) return self1.clear(triggerChange);
            setSelectedDate(date, format);
            self1.latestSelectedDateObj = self1.selectedDates[self1.selectedDates.length - 1];
            self1.redraw();
            jumpToDate(undefined, triggerChange);
            setHoursFromDate();
            if (self1.selectedDates.length === 0) self1.clear(false);
            updateValue(triggerChange);
            if (triggerChange) triggerEvent("onChange");
        }
        function parseDateRules(arr) {
            return arr.slice().map(function(rule) {
                if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) return self1.parseDate(rule, undefined, true);
                else if (rule && typeof rule === "object" && rule.from && rule.to) return {
                    from: self1.parseDate(rule.from, undefined),
                    to: self1.parseDate(rule.to, undefined)
                };
                return rule;
            }).filter(function(x) {
                return x;
            }); // remove falsy values
        }
        function setupDates() {
            self1.selectedDates = [];
            self1.now = self1.parseDate(self1.config.now) || new Date();
            // Workaround IE11 setting placeholder as the input's value
            var preloadedDate = self1.config.defaultDate || ((self1.input.nodeName === "INPUT" || self1.input.nodeName === "TEXTAREA") && self1.input.placeholder && self1.input.value === self1.input.placeholder ? null : self1.input.value);
            if (preloadedDate) setSelectedDate(preloadedDate, self1.config.dateFormat);
            self1._initialDate = self1.selectedDates.length > 0 ? self1.selectedDates[0] : self1.config.minDate && self1.config.minDate.getTime() > self1.now.getTime() ? self1.config.minDate : self1.config.maxDate && self1.config.maxDate.getTime() < self1.now.getTime() ? self1.config.maxDate : self1.now;
            self1.currentYear = self1._initialDate.getFullYear();
            self1.currentMonth = self1._initialDate.getMonth();
            if (self1.selectedDates.length > 0) self1.latestSelectedDateObj = self1.selectedDates[0];
            if (self1.config.minTime !== undefined) self1.config.minTime = self1.parseDate(self1.config.minTime, "H:i");
            if (self1.config.maxTime !== undefined) self1.config.maxTime = self1.parseDate(self1.config.maxTime, "H:i");
            self1.minDateHasTime = !!self1.config.minDate && (self1.config.minDate.getHours() > 0 || self1.config.minDate.getMinutes() > 0 || self1.config.minDate.getSeconds() > 0);
            self1.maxDateHasTime = !!self1.config.maxDate && (self1.config.maxDate.getHours() > 0 || self1.config.maxDate.getMinutes() > 0 || self1.config.maxDate.getSeconds() > 0);
        }
        function setupInputs() {
            self1.input = getInputElem();
            /* istanbul ignore next */ if (!self1.input) {
                self1.config.errorHandler(new Error("Invalid input element specified"));
                return;
            }
            // hack: store previous type to restore it after destroy()
            self1.input._type = self1.input.type;
            self1.input.type = "text";
            self1.input.classList.add("flatpickr-input");
            self1._input = self1.input;
            if (self1.config.altInput) {
                // replicate self.element
                self1.altInput = createElement(self1.input.nodeName, self1.config.altInputClass);
                self1._input = self1.altInput;
                self1.altInput.placeholder = self1.input.placeholder;
                self1.altInput.disabled = self1.input.disabled;
                self1.altInput.required = self1.input.required;
                self1.altInput.tabIndex = self1.input.tabIndex;
                self1.altInput.type = "text";
                self1.input.setAttribute("type", "hidden");
                if (!self1.config.static && self1.input.parentNode) self1.input.parentNode.insertBefore(self1.altInput, self1.input.nextSibling);
            }
            if (!self1.config.allowInput) self1._input.setAttribute("readonly", "readonly");
            updatePositionElement();
        }
        function updatePositionElement() {
            self1._positionElement = self1.config.positionElement || self1._input;
        }
        function setupMobile() {
            var inputType = self1.config.enableTime ? self1.config.noCalendar ? "time" : "datetime-local" : "date";
            self1.mobileInput = createElement("input", self1.input.className + " flatpickr-mobile");
            self1.mobileInput.tabIndex = 1;
            self1.mobileInput.type = inputType;
            self1.mobileInput.disabled = self1.input.disabled;
            self1.mobileInput.required = self1.input.required;
            self1.mobileInput.placeholder = self1.input.placeholder;
            self1.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
            if (self1.selectedDates.length > 0) self1.mobileInput.defaultValue = self1.mobileInput.value = self1.formatDate(self1.selectedDates[0], self1.mobileFormatStr);
            if (self1.config.minDate) self1.mobileInput.min = self1.formatDate(self1.config.minDate, "Y-m-d");
            if (self1.config.maxDate) self1.mobileInput.max = self1.formatDate(self1.config.maxDate, "Y-m-d");
            if (self1.input.getAttribute("step")) self1.mobileInput.step = String(self1.input.getAttribute("step"));
            self1.input.type = "hidden";
            if (self1.altInput !== undefined) self1.altInput.type = "hidden";
            try {
                if (self1.input.parentNode) self1.input.parentNode.insertBefore(self1.mobileInput, self1.input.nextSibling);
            } catch (_a) {}
            bind(self1.mobileInput, "change", function(e) {
                self1.setDate(getEventTarget(e).value, false, self1.mobileFormatStr);
                triggerEvent("onChange");
                triggerEvent("onClose");
            });
        }
        function toggle(e) {
            if (self1.isOpen === true) return self1.close();
            self1.open(e);
        }
        function triggerEvent(event, data) {
            // If the instance has been destroyed already, all hooks have been removed
            if (self1.config === undefined) return;
            var hooks = self1.config[event];
            if (hooks !== undefined && hooks.length > 0) for(var i = 0; hooks[i] && i < hooks.length; i++)hooks[i](self1.selectedDates, self1.input.value, self1, data);
            if (event === "onChange") {
                self1.input.dispatchEvent(createEvent("change"));
                // many front-end frameworks bind to the input event
                self1.input.dispatchEvent(createEvent("input"));
            }
        }
        function createEvent(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, true, true);
            return e;
        }
        function isDateSelected(date) {
            for(var i = 0; i < self1.selectedDates.length; i++){
                var selectedDate = self1.selectedDates[i];
                if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0) return "" + i;
            }
            return false;
        }
        function isDateInRange(date) {
            if (self1.config.mode !== "range" || self1.selectedDates.length < 2) return false;
            return compareDates(date, self1.selectedDates[0]) >= 0 && compareDates(date, self1.selectedDates[1]) <= 0;
        }
        function updateNavigationCurrentMonth() {
            if (self1.config.noCalendar || self1.isMobile || !self1.monthNav) return;
            self1.yearElements.forEach(function(yearElement, i) {
                var d = new Date(self1.currentYear, self1.currentMonth, 1);
                d.setMonth(self1.currentMonth + i);
                if (self1.config.showMonths > 1 || self1.config.monthSelectorType === "static") self1.monthElements[i].textContent = monthToStr(d.getMonth(), self1.config.shorthandCurrentMonth, self1.l10n) + " ";
                else self1.monthsDropdownContainer.value = d.getMonth().toString();
                yearElement.value = d.getFullYear().toString();
            });
            self1._hidePrevMonthArrow = self1.config.minDate !== undefined && (self1.currentYear === self1.config.minDate.getFullYear() ? self1.currentMonth <= self1.config.minDate.getMonth() : self1.currentYear < self1.config.minDate.getFullYear());
            self1._hideNextMonthArrow = self1.config.maxDate !== undefined && (self1.currentYear === self1.config.maxDate.getFullYear() ? self1.currentMonth + 1 > self1.config.maxDate.getMonth() : self1.currentYear > self1.config.maxDate.getFullYear());
        }
        function getDateStr(specificFormat) {
            var format = specificFormat || (self1.config.altInput ? self1.config.altFormat : self1.config.dateFormat);
            return self1.selectedDates.map(function(dObj) {
                return self1.formatDate(dObj, format);
            }).filter(function(d, i, arr) {
                return self1.config.mode !== "range" || self1.config.enableTime || arr.indexOf(d) === i;
            }).join(self1.config.mode !== "range" ? self1.config.conjunction : self1.l10n.rangeSeparator);
        }
        /**
         * Updates the values of inputs associated with the calendar
         */ function updateValue(triggerChange) {
            if (triggerChange === void 0) triggerChange = true;
            if (self1.mobileInput !== undefined && self1.mobileFormatStr) self1.mobileInput.value = self1.latestSelectedDateObj !== undefined ? self1.formatDate(self1.latestSelectedDateObj, self1.mobileFormatStr) : "";
            self1.input.value = getDateStr(self1.config.dateFormat);
            if (self1.altInput !== undefined) self1.altInput.value = getDateStr(self1.config.altFormat);
            if (triggerChange !== false) triggerEvent("onValueUpdate");
        }
        function onMonthNavClick(e) {
            var eventTarget = getEventTarget(e);
            var isPrevMonth = self1.prevMonthNav.contains(eventTarget);
            var isNextMonth = self1.nextMonthNav.contains(eventTarget);
            if (isPrevMonth || isNextMonth) changeMonth(isPrevMonth ? -1 : 1);
            else if (self1.yearElements.indexOf(eventTarget) >= 0) eventTarget.select();
            else if (eventTarget.classList.contains("arrowUp")) self1.changeYear(self1.currentYear + 1);
            else if (eventTarget.classList.contains("arrowDown")) self1.changeYear(self1.currentYear - 1);
        }
        function timeWrapper(e) {
            e.preventDefault();
            var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
            if (self1.amPM !== undefined && eventTarget === self1.amPM) self1.amPM.textContent = self1.l10n.amPM[int(self1.amPM.textContent === self1.l10n.amPM[0])];
            var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
            var newValue = curValue + step * delta;
            if (typeof input.value !== "undefined" && input.value.length === 2) {
                var isHourElem = input === self1.hourElement, isMinuteElem = input === self1.minuteElement;
                if (newValue < min) {
                    newValue = max + newValue + int(!isHourElem) + (int(isHourElem) && int(!self1.amPM));
                    if (isMinuteElem) incrementNumInput(undefined, -1, self1.hourElement);
                } else if (newValue > max) {
                    newValue = input === self1.hourElement ? newValue - max - int(!self1.amPM) : min;
                    if (isMinuteElem) incrementNumInput(undefined, 1, self1.hourElement);
                }
                if (self1.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) self1.amPM.textContent = self1.l10n.amPM[int(self1.amPM.textContent === self1.l10n.amPM[0])];
                input.value = pad(newValue);
            }
        }
        init();
        return self1;
    }
    /* istanbul ignore next */ function _flatpickr(nodeList, config) {
        // static list
        var nodes = Array.prototype.slice.call(nodeList).filter(function(x) {
            return x instanceof HTMLElement;
        });
        var instances = [];
        for(var i = 0; i < nodes.length; i++){
            var node = nodes[i];
            try {
                if (node.getAttribute("data-fp-omit") !== null) continue;
                if (node._flatpickr !== undefined) {
                    node._flatpickr.destroy();
                    node._flatpickr = undefined;
                }
                node._flatpickr = FlatpickrInstance(node, config || {});
                instances.push(node._flatpickr);
            } catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    /* istanbul ignore next */ if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
        // browser env
        HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
            return _flatpickr(this, config);
        };
        HTMLElement.prototype.flatpickr = function(config) {
            return _flatpickr([
                this
            ], config);
        };
    }
    /* istanbul ignore next */ var flatpickr = function(selector, config) {
        if (typeof selector === "string") return _flatpickr(window.document.querySelectorAll(selector), config);
        else if (selector instanceof Node) return _flatpickr([
            selector
        ], config);
        else return _flatpickr(selector, config);
    };
    /* istanbul ignore next */ flatpickr.defaultConfig = {};
    flatpickr.l10ns = {
        en: __assign({}, english),
        default: __assign({}, english)
    };
    flatpickr.localize = function(l10n) {
        flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
    };
    flatpickr.setDefaults = function(config) {
        flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
    };
    flatpickr.parseDate = createDateParser({});
    flatpickr.formatDate = createDateFormatter({});
    flatpickr.compareDates = compareDates;
    /* istanbul ignore next */ if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") jQuery.fn.flatpickr = function(config) {
        return _flatpickr(this, config);
    };
    Date.prototype.fp_incr = function(days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") window.flatpickr = flatpickr;
    return flatpickr;
});

//# sourceMappingURL=To-Do-List-Better.941d88fd.js.map
