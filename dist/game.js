"use strict";
var Model;
(function (Model) {
    Model.statKeys = ['health', 'happiness', 'intelligence', 'reputation'];
})(Model || (Model = {}));
var ScenarioData;
(function (ScenarioData) {
    ScenarioData.scenarios = [
        {
            id: 'tiny-dictator', minAge: 1, maxAge: 4, icon: 'moon', category: 'EARLY YEARS',
            title: 'The Bedtime Negotiations',
            story: 'The adults insist that 7:30 p.m. is a reasonable bedtime. You have no concept of time, but you know tyranny when you see it.',
            choices: [
                { label: 'Launch a full-scale protest.', outcome: 'The protest is loud, disorganized, and technically successful. You stay up twelve extra minutes.', effects: { happiness: 6, health: -3, reputation: -2 } },
                { label: 'Sleep. Plot your revenge tomorrow.', outcome: 'Eight uninterrupted hours. Your enemies never see it coming.', effects: { health: 6, intelligence: 2 } },
                { label: 'Demand a bedtime story with better writing.', outcome: 'An exhausted parent improvises an allegory about tax fraud. You are captivated.', effects: { intelligence: 5, happiness: 2 } }
            ]
        },
        {
            id: 'wall-art', minAge: 2, maxAge: 4, icon: 'palette', category: 'EARLY YEARS',
            title: 'An Artist Is Born',
            story: 'You discover crayons and a suspiciously empty living-room wall. Your first exhibition is met with divided critical opinion.',
            choices: [
                { label: 'Sign the wall. Own your vision.', outcome: 'Nobody understands the piece, but the signature is unmistakable. A difficult genius is born.', effects: { happiness: 6, reputation: -4, intelligence: 2 } },
                { label: 'Blame the family dog.', outcome: 'The dog takes the fall. Your conscience develops a small, expensive crack.', effects: { intelligence: 4, reputation: -3 } },
                { label: 'Help clean it up.', outcome: 'Your artistic era ends after fourteen minutes. The grown-ups look relieved.', effects: { reputation: 6, happiness: -2 } }
            ]
        },
        {
            id: 'playground', minAge: 5, maxAge: 11, icon: 'coins', category: 'SCHOOL DAYS',
            title: 'The Playground Economy',
            story: 'Someone is selling "rare" pebbles near the swings. You recognize an emerging market with absolutely no regulation.',
            choices: [
                { label: 'Start a competing pebble business.', outcome: 'You corner the lunchtime geology market. The revenue is real; the business model is not.', effects: { money: 25, intelligence: 3, reputation: 3 } },
                { label: 'Expose the entire operation.', outcome: 'The teacher calls you "principled." The other children call you something less flattering.', effects: { reputation: -4, intelligence: 5 } },
                { label: 'Buy the nicest pebble for your collection.', outcome: 'It is, in fairness, an excellent pebble.', effects: { money: -5, happiness: 7 } }
            ]
        },
        {
            id: 'photo-day', minAge: 5, maxAge: 11, icon: 'camera', category: 'SCHOOL DAYS',
            title: 'Picture Day: A Tragedy',
            story: 'It is school picture day. Your hair has made an independent decision, and the photographer has the compassion of a parking meter.',
            choices: [
                { label: 'Commit to the worst possible expression.', outcome: 'The photo becomes a family heirloom and a permanent source of blackmail.', effects: { happiness: 6, reputation: -3 } },
                { label: 'Attempt a sophisticated smile.', outcome: 'You look like a tiny insurance executive. Your relatives are inexplicably proud.', effects: { reputation: 5, happiness: -2 } },
                { label: 'Negotiate for creative control.', outcome: 'The photographer respects your audacity, if not your artistic direction.', effects: { intelligence: 3, reputation: 3 } }
            ]
        },
        {
            id: 'class-pet', minAge: 6, maxAge: 12, icon: 'paw-print', category: 'SCHOOL DAYS',
            title: 'The Class Pet Has Escaped',
            story: 'The classroom hamster is missing. A child claims it has "returned to the wild," which is a bold description of the cafeteria.',
            choices: [
                { label: 'Organize a serious search party.', outcome: 'The hamster is found behind a vending machine. Your command skills worry the teacher.', effects: { reputation: 6, intelligence: 3 } },
                { label: 'Make missing-hamster posters.', outcome: 'Your posters are excellent. The hamster cannot read them, but morale improves.', effects: { happiness: 5, reputation: 3 } },
                { label: 'Let the hamster pursue its dreams.', outcome: 'It returns on its own, carrying a french fry. You both learned something.', effects: { intelligence: 4, happiness: 2 } }
            ]
        },
        {
            id: 'group-chat', minAge: 12, maxAge: 17, icon: 'messages-square', category: 'TEEN DRAMA',
            title: 'The Group Chat Tribunal',
            story: 'A private screenshot has reached the wrong group chat. Seven people are typing, and none of them are being reasonable.',
            choices: [
                { label: 'Apologize without a Notes-app statement.', outcome: 'The drama passes faster than anyone expected. This is considered radical maturity.', effects: { reputation: 7, intelligence: 3 } },
                { label: 'Post an elaborate clarification thread.', outcome: 'Your explanation has fourteen parts. It becomes the second scandal.', effects: { reputation: -9, happiness: -4 } },
                { label: 'Put your phone down and go outside.', outcome: 'The sunlight is alarming at first. You eventually remember how grass works.', effects: { health: 5, happiness: 6 } }
            ]
        },
        {
            id: 'accidental-viral', minAge: 13, maxAge: 17, icon: 'video', category: 'TEEN DRAMA',
            title: 'Fifteen Minutes of Internet Fame',
            story: 'A video of you falling off a cafeteria chair has 200,000 views. Half the comments call you an icon. The rest are worse.',
            choices: [
                { label: 'Become the meme. Own the meme.', outcome: 'You release merch nobody asked for. Against all odds, some of it sells.', effects: { money: 90, reputation: 7, happiness: -3 } },
                { label: 'Ask politely for the video to come down.', outcome: 'The original disappears. A dozen reposts remain. At least you tried.', effects: { reputation: 3, happiness: 4 } },
                { label: 'Create a more embarrassing sequel.', outcome: 'The algorithm applauds. Your future self will not.', effects: { reputation: -5, happiness: 7, health: -2 } }
            ]
        },
        {
            id: 'sneaker-oracle', minAge: 14, maxAge: 17, icon: 'shopping-bag', category: 'TEEN DRAMA',
            title: 'The Limited-Edition Shoe Prophecy',
            story: 'Everyone swears a pair of neon sneakers is about to "change the culture." They look like expensive traffic cones.',
            choices: [
                { label: 'Buy the hype. Buy the shoes.', outcome: 'They hurt your feet, but strangers briefly acknowledge your existence.', effects: { money: -80, reputation: 7, health: -2 }, requiresMoney: 80 },
                { label: 'Wear what you already own.', outcome: 'Your bank account survives. Your shoes continue doing their one actual job.', effects: { intelligence: 5, happiness: 3 } },
                { label: 'Design an even uglier pair as a joke.', outcome: 'A local shop offers you $60 for the idea. Satire loses another battle.', effects: { money: 60, happiness: 5, reputation: 2 } }
            ]
        },
        {
            id: 'business-opportunity', minAge: 18, maxAge: 30, icon: 'badge-dollar-sign', category: 'ADULTING',
            title: 'An Interesting Business Opportunity',
            story: 'An old classmate promises $10,000 a week through a "private wealth circle." His profile picture features a rented Lamborghini.',
            choices: [
                { label: 'Invest $500. What could possibly go wrong?', outcome: 'The wealth circle becomes a wealth spiral. Your $500 is now a motivational podcast.', effects: { money: -500, intelligence: 4, happiness: -8 }, requiresMoney: 500 },
                { label: 'Ignore him. You have seen this documentary.', outcome: 'Six weeks later his account goes private. Your skepticism ages beautifully.', effects: { intelligence: 7, happiness: 3 } },
                { label: 'Ask to rent the Lamborghini for photos.', outcome: 'He does not find this funny. You find it extremely funny.', effects: { happiness: 8, reputation: -2 } }
            ]
        },
        {
            id: 'luxury-roommate', minAge: 18, maxAge: 34, icon: 'home', category: 'ADULTING',
            title: 'The Luxury Living Situation',
            story: 'A listing advertises an "open-concept sleeping suite." In person, it is a couch next to the refrigerator. The broker calls it intentional.',
            choices: [
                { label: 'Pay $150 for the privilege of the couch.', outcome: 'The fridge hums you to sleep. At least breakfast is a short commute.', effects: { money: -150, happiness: -5, health: -2 }, requiresMoney: 150 },
                { label: 'Walk out with your dignity.', outcome: 'You return to your existing situation, newly grateful for walls.', effects: { happiness: 5, reputation: 2 } },
                { label: 'Counteroffer with $30 and a harsh review.', outcome: 'The broker blocks your number. The review gets eleven likes.', effects: { money: -30, reputation: 4, happiness: 3 }, requiresMoney: 30 }
            ]
        },
        {
            id: 'networking', minAge: 18, maxAge: 35, icon: 'handshake', category: 'ADULTING',
            title: 'A Room Full of Important People',
            story: 'You stumble into a networking event where everyone is a founder, a visionary, or "between ventures." The sparkling water costs $9.',
            minStats: { reputation: 30 },
            choices: [
                { label: 'Introduce yourself as a "disruption consultant."', outcome: 'Three people ask for your business card. You do not have one. Nobody notices.', effects: { reputation: 7, intelligence: -2 } },
                { label: 'Have one genuine conversation.', outcome: 'You meet someone interesting. Neither of you mentions synergy.', effects: { happiness: 6, reputation: 4 } },
                { label: 'Take the complimentary snacks and leave.', outcome: 'A tactical victory. For once, an event delivers measurable value.', effects: { health: 2, happiness: 7 } }
            ]
        },
        {
            id: 'corporate-wellness', minAge: 30, maxAge: 64, icon: 'briefcase-business', category: 'THE MIDDLE YEARS',
            title: 'Mandatory Optional Happiness',
            story: 'A corporate mailing list invites you to a "mandatory-optional" happiness webinar. The presenter begins by explaining the concept of joy in forty-seven slides.',
            choices: [
                { label: 'Attend and ask difficult questions.', outcome: 'You are removed from the webinar after asking whether happiness has paid time off.', effects: { intelligence: 5, reputation: -3, happiness: 4 } },
                { label: 'Pretend your connection failed.', outcome: 'Your internet has never served you better. You spend the hour doing literally anything else.', effects: { happiness: 7, reputation: -1 } },
                { label: 'Become the most enthusiastic participant.', outcome: 'You receive a digital badge. It has no tangible value and somehow weighs on your soul.', effects: { reputation: 6, happiness: -5 } }
            ]
        },
        {
            id: 'neighborhood-chat', minAge: 30, maxAge: 64, icon: 'megaphone', category: 'THE MIDDLE YEARS',
            title: 'The Neighborhood Emergency',
            story: 'A neighborhood group has posted 83 messages about an "unknown suspicious object" on the sidewalk. It is a zucchini.',
            choices: [
                { label: 'Calm the group with some facts.', outcome: 'You identify the vegetable. Several neighbors accuse you of being in on it.', effects: { intelligence: 4, reputation: -3 } },
                { label: 'Join the investigation dramatically.', outcome: 'You are promoted to head of produce surveillance. The power immediately goes to your head.', effects: { reputation: 6, happiness: 3 } },
                { label: 'Make zucchini bread and end the debate.', outcome: 'The bread is good enough to restore public order. Peace is fragile but delicious.', effects: { reputation: 8, happiness: 5, health: 2 } }
            ]
        },
        {
            id: 'retirement-committee', minAge: 60, maxAge: 120, icon: 'crown', category: 'GOLDEN YEARS',
            title: 'The Committee Has Spoken',
            story: 'The local community committee has banned loud socks, "aggressive gardening," and any discussion of the thermostat. A rebellion is forming.',
            choices: [
                { label: 'Lead the resistance in fluorescent socks.', outcome: 'Your speech at the community hall receives a standing ovation and one noise complaint.', effects: { happiness: 8, reputation: 5, health: -2 } },
                { label: 'Run for committee president.', outcome: 'You win unopposed. Your first act is to abolish the committee. History will be confused.', effects: { reputation: 9, intelligence: 4 } },
                { label: 'Watch the chaos over a cup of tea.', outcome: 'Everyone else argues about sock policy. Your afternoon remains magnificent.', effects: { health: 5, happiness: 6 } }
            ]
        },
        {
            id: 'miracle-device', minAge: 65, maxAge: 120, icon: 'sparkles', category: 'GOLDEN YEARS',
            title: 'The Miracle Wellness Machine',
            story: 'An infomercial promises a revolutionary machine that delivers "age-defying vibrations." The spokesperson is suspiciously young and very tan.',
            choices: [
                { label: 'Order it for $200. Science probably.', outcome: 'It is a vibrating footrest with a laser pointer. Your cat loves it; you feel foolish.', effects: { money: -200, happiness: -4, health: 1 }, requiresMoney: 200 },
                { label: 'Take a walk instead.', outcome: 'The air is fresh, your legs still work, and no subscription is required.', effects: { health: 6, happiness: 5 } },
                { label: 'Write a brutally honest product review.', outcome: 'Your review goes mildly viral among retirees. You become a reluctant consumer advocate.', effects: { reputation: 6, intelligence: 3 } }
            ]
        }
    ];
    ScenarioData.byId = (id) => ScenarioData.scenarios.find(s => s.id === id);
})(ScenarioData || (ScenarioData = {}));
var Engine;
(function (Engine) {
    const STORAGE_KEY = 'mortal-life-mvp-v1';
    const VERSION = 1;
    Engine.countries = [
        { name: 'United States', flag: '🇺🇸', city: 'Chicago', adjective: 'American' },
        { name: 'Canada', flag: '🇨🇦', city: 'Montréal', adjective: 'Canadian' },
        { name: 'Mexico', flag: '🇲🇽', city: 'Guadalajara', adjective: 'Mexican' },
    ];
    // Curated birthplaces. Keep the order explicitly alphabetical in the menus.
    Engine.citiesByCountry = {
        'United States': ['Chicago', 'Los Angeles', 'Miami', 'New York City', 'San Francisco'],
        'Canada': ['Montréal', 'Toronto', 'Vancouver'],
        'Mexico': ['Guadalajara', 'Mexico City', 'Monterrey'],
    };
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const empty = { version: VERSION, phase: 'create', character: null, history: [], activeScenarioId: null, resolution: null, deathReason: null };
    function getCountry(name) { return Engine.countries.find(c => c.name === name) || Engine.countries[0]; }
    Engine.getCountry = getCountry;
    Engine.clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
    function money(n) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n); }
    Engine.money = money;
    function fullName(character) { return `${character.firstName} ${character.lastName}`; }
    Engine.fullName = fullName;
    function birthdayText(b) { return `${months[b.month - 1]} ${b.day}`; }
    Engine.birthdayText = birthdayText;
    function zodiac(b) {
        const edges = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
        const current = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
        const previous = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];
        return b.day >= edges[b.month - 1] ? current[b.month - 1] : previous[b.month - 1];
    }
    Engine.zodiac = zodiac;
    function randomBirthday() {
        const month = 1 + Math.floor(Math.random() * 12);
        const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
        return { month, day: 1 + Math.floor(Math.random() * lastDay) };
    }
    function restore() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw)
                return { ...empty };
            const loaded = JSON.parse(raw);
            if (loaded.version !== VERSION || !['create', 'playing', 'dead'].includes(loaded.phase))
                return { ...empty };
            if (loaded.phase !== 'create' && (!loaded.character || !Array.isArray(loaded.history)))
                return { ...empty };
            if (loaded.character) {
                const c = loaded.character;
                if (!c.firstName || !c.lastName || !Number.isInteger(c.age) || c.age < 0 || !c.stats)
                    return { ...empty };
                // Keep pre-0.4 browser saves playable after the creator gender-label update.
                if (c.gender === 'Man')
                    c.gender = 'Male';
                if (c.gender === 'Woman')
                    c.gender = 'Female';
                c.age = Engine.clamp(c.age, 0, 120);
                c.money = Math.max(0, Number(c.money) || 0);
                Model.statKeys.forEach(k => c.stats[k] = Engine.clamp(Number(c.stats[k])));
            }
            if (loaded.activeScenarioId && !ScenarioData.byId(loaded.activeScenarioId))
                loaded.activeScenarioId = null;
            loaded.resolution || (loaded.resolution = null);
            loaded.deathReason || (loaded.deathReason = null);
            return loaded;
        }
        catch {
            return { ...empty };
        }
    }
    Engine.state = restore();
    function save() { try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Engine.state));
    }
    catch { /* private mode may disallow storage */ } }
    function hasActiveDecision() { return !!Engine.state.activeScenarioId || !!Engine.state.resolution; }
    Engine.hasActiveDecision = hasActiveDecision;
    function start(input) {
        const first = input.firstName.trim().slice(0, 36);
        const last = input.lastName.trim().slice(0, 36);
        const city = input.city.trim().slice(0, 56);
        if (!first || !last || !['Male', 'Female'].includes(input.gender))
            return false;
        if (!Engine.citiesByCountry[input.country]?.includes(city))
            return false;
        const birthday = randomBirthday();
        const c = {
            firstName: first, lastName: last, city, country: getCountry(input.country).name, gender: input.gender, birthday,
            age: 0, money: 0, stats: { health: 86, happiness: 74, intelligence: 56, reputation: 50 }
        };
        const jokes = [
            'My parents seem reasonably prepared. This illusion will not last.',
            'A roomful of adults congratulates me on doing absolutely nothing. An excellent first day.',
            'I arrived with zero assets, no contacts, and an impressive ability to make demands.'
        ];
        Engine.state = {
            version: VERSION, phase: 'playing', character: c, deathReason: null, activeScenarioId: null, resolution: null,
            history: [{ id: 'birth', age: 0, title: 'Hello, world. My condolences.', story: `I was born in ${city}, ${c.country}. My birthday is ${birthdayText(birthday)}. I'm a ${zodiac(birthday)}.\n\n${jokes[Math.floor(Math.random() * jokes.length)]}` }]
        };
        save();
        return true;
    }
    Engine.start = start;
    function eligible(s, c) {
        if (c.age < s.minAge || c.age > s.maxAge || (s.minBalance !== undefined && c.money < s.minBalance))
            return false;
        if (s.minStats && Model.statKeys.some(k => s.minStats[k] !== undefined && c.stats[k] < s.minStats[k]))
            return false;
        if (s.maxStats && Model.statKeys.some(k => s.maxStats[k] !== undefined && c.stats[k] > s.maxStats[k]))
            return false;
        return true;
    }
    function chooseScenario(c) {
        const matches = ScenarioData.scenarios.filter(s => eligible(s, c));
        // All ages 1–120 are covered; safety fallback prevents a broken life with future scenario edits.
        const pool = matches.length ? matches : ScenarioData.scenarios.filter(s => c.age >= s.minAge && c.age <= s.maxAge);
        if (!pool.length)
            return ScenarioData.scenarios[ScenarioData.scenarios.length - 1];
        const recent = Engine.state.history.filter(h => !!h.scenarioId).slice(-2).map(h => h.scenarioId);
        const fresh = pool.filter(s => !recent.includes(s.id));
        const candidates = fresh.length ? fresh : pool;
        const weights = candidates.map(s => {
            const seen = Engine.state.history.filter(h => h.scenarioId === s.id).length;
            return 1 / (1 + seen * 3);
        });
        let roll = Math.random() * weights.reduce((a, b) => a + b, 0);
        for (let i = 0; i < candidates.length; i++) {
            roll -= weights[i];
            if (roll <= 0)
                return candidates[i];
        }
        return candidates[candidates.length - 1];
    }
    function ageUp() {
        if (Engine.state.phase !== 'playing' || !Engine.state.character || hasActiveDecision())
            return false;
        Engine.state.character.age += 1;
        const scenario = chooseScenario(Engine.state.character);
        Engine.state.activeScenarioId = scenario.id;
        save();
        return true;
    }
    Engine.ageUp = ageUp;
    function canChoose(choice) {
        const c = Engine.state.character;
        if (!c)
            return false;
        const cost = Math.max(choice.requiresMoney || 0, -(choice.effects.money || 0));
        if (c.money < cost)
            return false;
        if (choice.minStats && Model.statKeys.some(k => choice.minStats[k] !== undefined && c.stats[k] < choice.minStats[k]))
            return false;
        return true;
    }
    Engine.canChoose = canChoose;
    function costToChoose(choice) { return Math.max(choice.requiresMoney || 0, -(choice.effects.money || 0)); }
    Engine.costToChoose = costToChoose;
    function choose(index) {
        const c = Engine.state.character;
        const s = Engine.state.activeScenarioId ? ScenarioData.byId(Engine.state.activeScenarioId) : undefined;
        if (!c || Engine.state.phase !== 'playing' || !s || !Number.isInteger(index))
            return false;
        const option = s.choices[index];
        if (!option || !canChoose(option))
            return false;
        const effect = option.effects;
        Model.statKeys.forEach(k => c.stats[k] = Engine.clamp(c.stats[k] + (effect[k] || 0)));
        c.money = Math.max(0, c.money + (effect.money || 0));
        const diedHealth = c.stats.health <= 0;
        let diedNatural = false;
        if (!diedHealth && c.age >= 65) {
            const risk = 0.005 + Math.pow(Math.max(0, c.age - 65) / 45, 2) * 0.16;
            diedNatural = c.age >= 112 || Math.random() < risk;
        }
        Engine.state.history.push({ id: `${c.age}-${s.id}-${Engine.state.history.length}`, age: c.age, title: s.title,
            story: s.story, choice: option.label, outcome: option.outcome, effects: { ...effect }, scenarioId: s.id });
        Engine.state.activeScenarioId = null;
        if (diedHealth || diedNatural) {
            Engine.state.phase = 'dead';
            Engine.state.deathReason = diedHealth ? 'Your health reached zero. The universe declined to negotiate.' : 'Natural causes. Even the most stubborn stories have a final page.';
        }
        Engine.state.resolution = { title: s.title, outcome: option.outcome, effects: { ...effect }, died: diedHealth || diedNatural };
        save();
        return true;
    }
    Engine.choose = choose;
    function closeResolution() { if (!Engine.state.resolution)
        return; Engine.state.resolution = null; save(); }
    Engine.closeResolution = closeResolution;
    function restart() { Engine.state = { ...empty, history: [] }; save(); }
    Engine.restart = restart;
    function summary(c) {
        const highest = Model.statKeys.slice().sort((a, b) => c.stats[b] - c.stats[a])[0];
        const lines = {
            health: 'You spent a surprising amount of time in decent shape. Your body may have been your most sensible investment.',
            happiness: 'You took the scenic route through chaos and somehow found reasons to laugh along the way.',
            intelligence: 'You asked difficult questions, learned inconvenient answers, and seldom let common sense interrupt the plot.',
            reputation: 'People had opinions about you. Plenty of them. You left behind a very lively comment section.'
        };
        if (c.age < 30)
            return 'A short, chaotic run. You managed to make several headlines in a story nobody could predict.';
        return lines[highest] + (c.money >= 1000 ? ' At least the final balance was respectable.' : ' The bank account, meanwhile, has requested privacy.');
    }
    Engine.summary = summary;
})(Engine || (Engine = {}));
var UI;
(function (UI) {
    let modal = null;
    let plannedSection = 'Assets';
    let timelineScroll = 0;
    let jumpToLatest = false;
    const root = document.getElementById('app');
    const icons = {
        menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        house: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        chart: '<path d="M4 19h16M6 15V9m6 6V5m6 10v-3" stroke-linecap="round"/>',
        user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c.7-4 3.2-6 7.5-6s6.8 2 7.5 6"/>',
        x: '<path d="m5 5 14 14M19 5 5 19"/>',
        arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
        arrowUp: '<path d="M12 19V5m-6 6 6-6 6 6"/>',
        chevron: '<path d="m9 18 6-6-6-6"/>',
        check: '<path d="m4 12 5 5L20 6"/>',
        rotate: '<path d="M3 12a9 9 0 1 0 3-6m-3-2v5h5"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>',
        calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
        globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18m0-18c-3 3-3 15 0 18"/>',
        heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
        smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M8.5 9h.01M15.5 9h.01"/>',
        brain: '<path d="M12 6c0-3-4-4-6-1-3-1-5 2-4 5-2 2-1 6 2 7 0 3 3 5 6 3l2-2V6Zm0 0c0-3 4-4 6-1 3-1 5 2 4 5 2 2 1 6-2 7 0 3-3 5-6 3l-2-2"/><path d="M8 8c-3 0-3 4 0 5m8-5c3 0 3 4 0 5M12 6v12"/>',
        sparkles: '<path d="m12 2 2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2Zm7 15 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/>',
        wallet: '<rect x="3" y="6" width="18" height="15" rx="3"/><path d="M3 9V5a2 2 0 0 1 2-2h13M16 14h5"/>',
        moon: '<path d="M20.7 14A9 9 0 0 1 10 3.3 9 9 0 1 0 20.7 14Z"/>',
        palette: '<path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 1.2-3.6 1.8 1.8 0 0 1 .9-3.4H18a4 4 0 0 0 4-4c0-4-4.5-7-10-7Z"/><path d="M7 11h.01M9 7h.01M14 7h.01M18 10h.01"/>',
        coins: '<circle cx="9" cy="9" r="6"/><path d="M14 14a6 6 0 1 0 2-10M9 6v6m-2-4h4m-4 2h4"/>',
        camera: '<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>',
        'paw-print': '<circle cx="8" cy="6" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="19" cy="9" r="1"/><circle cx="4" cy="10" r="1"/><path d="M9 12c2-3 4-3 6 0l3 4c2 3 0 6-3 5l-3-1-3 1c-3 1-5-2-3-5z"/>',
        'messages-square': '<path d="M3 4h14v11H8l-5 4zM18 9h3v12l-3-3h-6"/>',
        video: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
        'shopping-bag': '<path d="M4 8h16l-1 13H5L4 8ZM9 9V6a3 3 0 0 1 6 0v3"/>',
        'badge-dollar-sign': '<circle cx="12" cy="12" r="9"/><path d="M15 9c-1-2-6-2-6 1s6 1 6 4-5 3-6 1m3-9v12"/>',
        home: '<path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7"/>',
        handshake: '<path d="M2 9 7 5l4 1 2 3M22 9l-5-4-4 1-5 6 2 2 4-3 6 5-2 2-2-1-2 2-2-1-2 1-3-3-2 1-4-5z"/>',
        'briefcase-business': '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18M11 13v2h2v-2"/>',
        megaphone: '<path d="M3 11v3h4l11 5V6L7 11H3ZM7 14l2 7h3"/>',
        crown: '<path d="m2 8 5 4 5-7 5 7 5-4-2 12H4zM4 17h16"/>',
        skull: '<path d="M12 3a9 9 0 0 0-6 15v3h4v-3h4v3h4v-3a9 9 0 0 0-6-15z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>',
        lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',
        save: '<path d="M5 3h12l4 4v14H3V3zM7 3v6h10V3M7 21v-9h10v9"/>',
        chevronDown: '<path d="m6 9 6 6 6-6"/>'
    };
    function icon(name, size = 20, cls = '') { return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.sparkles}</svg>`; }
    function e(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    const fmt = (value) => Engine.money(value);
    const labelStat = { health: 'Health', happiness: 'Happiness', intelligence: 'Intelligence', reputation: 'Reputation' };
    const iconStat = { health: 'heart', happiness: 'smile', intelligence: 'brain', reputation: 'sparkles' };
    const statColor = { health: 'cyan', happiness: 'lime', intelligence: 'violet', reputation: 'coral' };
    function logo() { return `<div class="brand"><img class="brand-image" src="assets/life-ish-wordmark.png" alt="Life-ish" /></div>`; }
    function topbar(isGame = false) {
        return `<header class="topbar"><div class="topbar-left"><button class="icon-button menu-trigger" type="button" data-action="menu" aria-label="Open menu">${icon('menu', 23)}</button>${logo()}</div>${isGame ? '<span class="top-edition">a life in progress</span>' : ''}</header>`;
    }
    function avatar(c, large = false) {
        const code = (c.firstName + c.lastName).split('').reduce((a, x) => a + x.charCodeAt(0), 0);
        const skins = ['#edb38c', '#d89a76', '#b77d60', '#e5c1a5', '#9d654f'];
        const skin = skins[code % skins.length];
        const isLong = c.gender === 'Female';
        const hair = code % 3 === 0 ? '#24243e' : code % 3 === 1 ? '#392a34' : '#6c4337';
        const hairPart = isLong ? `<path d="M49 112c-9-19-9-56 4-73 12-16 43-20 59 0 14 18 13 56 6 75l-12 11-7-29H61l-4 27Z" fill="${hair}"/>` : `<path d="M48 78c-4-24 10-45 35-46 20-1 37 12 38 35l-10 7c-12-9-30-9-50-2L50 89Z" fill="${hair}"/>`;
        return `<div class="avatar-wrap ${large ? 'avatar-large' : ''}"><svg class="avatar-art" viewBox="0 0 168 172" role="img" aria-label="Illustrated portrait of ${e(c.firstName)}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="avbg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#403444"/><stop offset="1" stop-color="#1b1820"/></linearGradient><linearGradient id="avshirt" x1="0" x2="1"><stop stop-color="#e0b8c8"/><stop offset="1" stop-color="#9a6889"/></linearGradient></defs>
      <rect width="168" height="172" rx="25" fill="url(#avbg)"/><circle cx="132" cy="29" r="38" fill="#d69bb7" opacity=".08"/><circle cx="24" cy="139" r="45" fill="#caabc5" opacity=".09"/><circle cx="84" cy="83" r="60" fill="none" stroke="#ceb4c7" stroke-opacity=".14"/><path d="M19 172c3-34 29-51 65-51s63 17 65 51" fill="url(#avshirt)"/><path d="M69 124v-26h31v26c0 18-31 18-31 0Z" fill="${skin}"/>${hairPart}<ellipse cx="84" cy="82" rx="35" ry="42" fill="${skin}"/><path d="M53 73c1-29 12-41 31-41 26 0 36 17 36 35-13-2-25-10-32-18-6 11-21 20-35 24Z" fill="${hair}"/><path d="M66 85h8M94 85h8" stroke="#2f2930" stroke-width="2.6" stroke-linecap="round"/><path d="M81 87l-2 13h5" stroke="#a96655" stroke-width="1.8" fill="none"/><path d="M76 109c6 4 12 4 18-1" stroke="#874a49" stroke-width="2.4" stroke-linecap="round" fill="none"/><path d="M65 121c11 16 27 16 38 0" stroke="#e7f9fd" stroke-opacity=".35" stroke-width="2" fill="none"/><path d="M13 20h23M13 25h14" stroke="#e4b8d0" stroke-opacity=".55" stroke-width="1.5"/><circle cx="146" cy="140" r="3" fill="#e4b8d0"/></svg><span class="avatar-status"></span></div>`;
    }
    // Each option reserves a full bleed visual region; future image assets can be
    // supplied via .place-option-art without changing the picker interaction.
    function placeOption(kind, place, selected) {
        return `<button type="button" class="place-option ${selected ? 'is-selected' : ''}"
      data-action="pick-place" data-kind="${kind}" data-value="${e(place)}" aria-pressed="${selected}">
      <span class="place-option-art" data-place-art="${e(place)}" aria-hidden="true"></span>
      <span class="place-option-name">${e(place)}</span>
      <span class="place-option-check">${icon('check', 17)}</span>
    </button>`;
    }
    function placePicker(kind, initial, options) {
        const title = kind === 'country' ? 'Country of birth' : 'City of birth';
        return `<div class="field place-field"><label id="${kind}-label" for="${kind}-trigger">${title}</label>
      <div class="place-picker" data-picker="${kind}">
        <input type="hidden" id="${kind}" name="${kind}" value="${e(initial)}"/>
        <button id="${kind}-trigger" type="button" class="place-trigger ${kind === 'country' ? 'has-country-flag' : kind === 'city' ? 'has-city-photo' : ''}" ${kind === 'country' ? `data-country="${e(initial)}"` : kind === 'city' ? `data-city="${e(initial)}"` : ''}
          data-action="toggle-place" data-kind="${kind}" aria-haspopup="true"
          aria-expanded="false" aria-controls="${kind}-options" aria-labelledby="${kind}-label ${kind}-selection">
          <span id="${kind}-selection" class="place-trigger-selection">${e(initial)}</span>
          ${icon('chevronDown', 18, 'place-chevron')}
        </button>
        <div id="${kind}-options" class="place-panel" role="group" aria-label="Select ${title.toLowerCase()}" hidden>
          <div class="place-options">${options.map(option => placeOption(kind, option, option === initial)).join('')}</div>
        </div>
      </div>
    </div>`;
    }
    function createView() {
        const defaultCountry = Engine.countries[0].name;
        const defaultCity = Engine.citiesByCountry[defaultCountry][0];
        return `${topbar()}<main class="create-grid"><div class="create-ambient" aria-hidden="true"></div>
    <section class="create-intro animate-up"><h1>Start a new life</h1></section>
    <section class="creator-card glass animate-up stagger-one" aria-label="Create your character"><div class="creator-glow" aria-hidden="true"></div>
      <form id="create-form" novalidate autocomplete="off">
        <div class="form-row name-row"><div class="field"><label for="life-given">First name</label><input id="life-given" data-character-field="first" type="text" autocomplete="off" autocapitalize="words" spellcheck="false" data-lpignore="true" data-1p-ignore="true" maxlength="36" placeholder="First name" required/></div><div class="field"><label for="life-family">Last name</label><input id="life-family" data-character-field="last" type="text" autocomplete="off" autocapitalize="words" spellcheck="false" data-lpignore="true" data-1p-ignore="true" maxlength="36" placeholder="Last name" required/></div></div>
        <div class="field"><label>Gender</label><div class="gender-options"><label class="gender-pill gender-male"><input type="radio" name="gender" value="Male" checked/><span>Male</span></label><label class="gender-pill gender-female"><input type="radio" name="gender" value="Female"/><span>Female</span></label></div></div>
        <div class="form-row birth-row">
          ${placePicker('country', defaultCountry, Engine.countries.map(c => c.name))}
          ${placePicker('city', defaultCity, Engine.citiesByCountry[defaultCountry])}
        </div>
        <p class="form-error" id="form-error" role="alert" aria-live="polite"></p>
        <button class="primary-button create-button" type="submit" data-action="begin-life"><span>Begin life</span><span class="button-icon">${icon('arrow', 23)}</span></button>
      </form>
    </section></main>`;
    }
    function agePhase(age) {
        if (age <= 4)
            return 'Early beginnings';
        if (age <= 11)
            return 'Small human, big problems';
        if (age <= 17)
            return 'Teenage turbulence';
        if (age <= 29)
            return 'Adulthood, allegedly';
        if (age <= 59)
            return 'The plot thickens';
        return 'The legacy era';
    }
    function statusText(c) {
        if (c.age <= 1)
            return 'New here. Already demanding things.';
        if (c.age <= 17)
            return 'Growing pains, questionable gains.';
        if (c.age <= 35)
            return 'An adult on paper. A mystery in practice.';
        if (c.age <= 64)
            return 'Older, perhaps wiser. Results pending.';
        return 'Living proof that the plot has range.';
    }
    function profile(c) {
        const country = Engine.getCountry(c.country);
        return `<section class="profile-card glass" aria-label="Character information"><div class="profile-shine"></div><div class="profile-person">${avatar(c)}<div class="profile-identity"><div class="profile-kicker">${country.flag} <span>${e(country.adjective)} · ${e(c.city)}</span></div><h1>${e(Engine.fullName(c))}</h1><div class="profile-badges"><span>${e(c.age)} years old</span></div></div></div><div class="profile-divider"></div><div class="balance-box"><div class="balance-amount ${Engine.state.resolution && (Engine.state.resolution.effects.money || 0) !== 0 ? 'money-changed' : ''}">${fmt(c.money)}</div><div class="balance-label">Balance</div></div></section>`;
    }
    function ageHero(c) {
        return `<section class="age-hero glass" id="overview"><div class="age-decoration age-decoration-one"></div><div class="age-decoration age-decoration-two"></div><div class="age-content"><div class="age-kicker"><span class="gradient-bullet"></span> YOUR CURRENT CHAPTER</div><div class="hero-age-line"><span class="hero-age">${String(c.age).padStart(2, '0')}</span><div class="hero-age-suffix"><span>YEARS</span><span>ALIVE</span><i></i></div></div><div class="age-phase">${e(agePhase(c.age))}<span class="phase-dash"></span></div><p>${e(statusText(c))}</p></div><div class="hero-corner">${icon('sparkles', 19)}<span>CHAPTER ${String(c.age + 1).padStart(3, '0')} LOADING</span></div></section>`;
    }
    function bio(c) {
        return `<section class="bio-card glass"><div class="section-kicker"><span class="section-icon">${icon('user', 16)}</span> THE ORIGIN STORY</div><p>Born in <strong>${e(c.city)}, ${e(c.country)}</strong>. Birthday: <strong>${e(Engine.birthdayText(c.birthday))}</strong>. Zodiac: <strong>${e(Engine.zodiac(c.birthday))}</strong>.</p><span class="bio-aside">The rest is a work in progress.</span></section>`;
    }
    function timelineEvent(item, index, length) {
        const recent = index === length - 1;
        const intro = item.id === 'birth';
        return `<article class="timeline-item ${recent ? 'timeline-recent' : ''}"><div class="timeline-marker"><span></span></div><div class="timeline-event"><div class="event-meta"><span class="event-age">AGE ${String(item.age).padStart(2, '0')}</span>${recent ? '' : ''}</div><h3>${e(item.title)}</h3><p class="timeline-story">${e(item.story).replace(/\n\n/g, '<span class="text-break"></span>')}</p>${item.choice ? `<div class="entry-choice"><div class="decision-chip">${icon('check', 13)} ${e(item.choice)}</div><div class="entry-outcome">${e(item.outcome || '')}</div></div>` : ''}</div></article>`;
    }
    function timeline(c) {
        const entries = Engine.state.history;
        return `<section class="timeline-panel glass" id="overview" aria-label="Life timeline"><div class="life-timeline-header"><div class="life-age-meta"><div class="life-age-name"><span class="life-age-label">Age</span><strong>${c.age}</strong><span class="life-age-years">${c.age === 1 ? 'year' : 'years'}</span></div><div class="life-chapter-subtitle">${e(agePhase(c.age))}</div></div><div class="life-log-heading">Life log <span class="event-count">${entries.length}</span></div></div><div class="timeline-scroll" id="timeline-scroll" tabindex="0" aria-label="Chronological life events"><div class="timeline-track">${entries.map((t, i) => timelineEvent(t, i, entries.length)).join('')}</div></div><div class="timeline-footer-hint">${Engine.state.activeScenarioId ? 'Make a choice to continue.' : 'Saved automatically'}</div></section>`;
    }
    function statBar(key, value) {
        return `<div class="stat-row"><div class="stat-info"><span class="stat-label">${labelStat[key]}</span><span class="stat-number">${value}</span></div><div class="progress-track" role="progressbar" aria-label="${labelStat[key]}" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><span class="progress-fill ${statColor[key]}" style="width:${value}%"><i></i></span></div></div>`;
    }
    function statsPanel(c) {
        return `<section class="stats-panel glass" id="stats" aria-label="Character statistics"><div class="hud-stats-head"><span>Your stats</span></div><div class="stats-stack">${Model.statKeys.map(k => statBar(k, c.stats[k])).join('')}</div></section>`;
    }
    function dossierCard(c) {
        const country = Engine.getCountry(c.country);
        return `<section class="dossier-card glass"><div class="section-kicker"><span class="section-icon">${icon('user', 16)}</span> PERSONNEL RECORD</div><div class="dossier-row"><span>DATE OF BIRTH</span><strong>${e(Engine.birthdayText(c.birthday))}</strong></div><div class="dossier-row"><span>ASTROLOGICAL EXCUSE</span><strong>${e(Engine.zodiac(c.birthday))}</strong></div><div class="dossier-row"><span>ORIGIN</span><strong>${country.flag} ${e(c.city)}</strong></div><div class="dossier-row"><span>YEARS SURVIVED</span><strong>${c.age}</strong></div><div class="dossier-row"><span>LIFE DECISIONS</span><strong>${Engine.state.history.length - 1}</strong></div><button type="button" class="text-button" data-action="dossier">OPEN FULL DOSSIER ${icon('arrow', 16)}</button></section>`;
    }
    function railNote() { return `<div class="rail-note"><span class="note-asterisk">✳</span><span>YOUR NEXT YEAR IS<br>ONE TAP AWAY.</span><p>Time waits for absolutely no one. Except while you're making a decision.</p></div>`; }
    function dock() {
        const lock = Engine.hasActiveDecision();
        return `<nav class="bottom-dock" aria-label="Primary navigation"><button class="dock-item" type="button" data-action="menu" aria-label="Menu">${icon('menu', 22)}<span>Menu</span></button><button class="dock-item" type="button" data-action="planned" data-section="Assets" aria-label="Assets — coming soon">${icon('wallet', 22)}<span>Assets</span></button><div class="dock-age-slot"><button class="age-button" type="button" data-action="age" aria-label="Advance one year" ${lock ? 'disabled title="Finish your current decision first"' : ''}><span class="age-ring"></span>${icon('plus', 30)}<span>Age</span></button></div><button class="dock-item" type="button" data-action="planned" data-section="Relationships" aria-label="Relationships — coming soon">${icon('handshake', 23)}<span>Relationships</span></button><button class="dock-item" type="button" data-action="planned" data-section="Activities" aria-label="Activities — coming soon">${icon('sparkles', 23)}<span>Activities</span></button></nav>`;
    }
    function gameView() {
        const c = Engine.state.character;
        return `${topbar(true)}<main class="game-main">${profile(c)}<div class="life-grid"><div class="life-column">${timeline(c)}</div></div><div class="dashboard-controls">${dock()}${statsPanel(c)}</div></main>`;
    }
    function results(effects) {
        const keys = Model.statKeys.filter(k => !!effects[k]);
        const chips = keys.map(k => `<span class="effect-pill ${effects[k] > 0 ? 'gain' : 'loss'}">${icon(iconStat[k], 14)} ${labelStat[k]} ${effects[k] > 0 ? '+' : ''}${effects[k]}</span>`);
        if (effects.money)
            chips.unshift(`<span class="effect-pill ${effects.money > 0 ? 'gain' : 'loss'}">${icon('wallet', 14)} ${effects.money > 0 ? '+' : ''}${fmt(effects.money)}</span>`);
        return chips.length ? chips.join('') : '<span class="effect-pill">No measurable effect. Suspicious.</span>';
    }
    function scenarioModal() {
        const scenario = ScenarioData.byId(Engine.state.activeScenarioId);
        const c = Engine.state.character;
        if (!scenario)
            return '';
        return `<div class="overlay" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="scenario-heading" class="scenario-dialog dialog glass"><div class="dialog-top"><span class="dialog-breadcrumb">Life event <span class="dialog-slash">·</span> age ${c.age}</span><span class="modal-event-count">${String(Engine.state.history.length).padStart(2, '0')}</span></div><div class="scenario-icon">${icon(scenario.icon, 28)}</div><div class="scenario-category">${e(scenario.category)}</div><h2 id="scenario-heading">${e(scenario.title)}</h2><p class="scenario-story">${e(scenario.story)}</p><div class="decision-head"><span>What do you do?</span></div><div class="choice-stack">${scenario.choices.map((o, i) => {
            const enabled = Engine.canChoose(o);
            const cost = Engine.costToChoose(o);
            return `<button class="choice-button" type="button" data-action="choice" data-index="${i}" ${enabled ? '' : 'disabled'}><span class="choice-index">${String(i + 1).padStart(2, '0')}</span><span class="choice-label">${e(o.label)}${!enabled ? `<small>${cost > c.money ? `Requires ${fmt(cost)} · Balance: ${fmt(c.money)}` : 'Requirements not met'}</small>` : ''}</span>${icon(enabled ? 'arrow' : 'lock', 17)}</button>`;
        }).join('')}</div><div class="modal-footnote">${icon('info', 14)} Choices shape your story.</div></section></div>`;
    }
    function outcomeModal() {
        const o = Engine.state.resolution;
        return `<div class="overlay" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="outcome-heading" class="outcome-dialog dialog glass"><div class="dialog-top"><span class="dialog-breadcrumb">Your outcome</span><span class="result-mark">${icon(o.died ? 'skull' : 'check', 18)}</span></div><div class="outcome-symbol">${icon(o.died ? 'skull' : 'sparkles', 30)}</div><div class="scenario-category">${o.died ? 'Final chapter' : 'Decision made'}</div><h2 id="outcome-heading">${o.died ? 'The end of the line.' : 'Well, that happened.'}</h2><p class="scenario-story">${e(o.outcome)}</p><div class="results-divider">What changed</div><div class="effect-row">${results(o.effects)}</div>${o.died ? `<p class="death-inline">${e(Engine.state.deathReason || '')}</p>` : ''}<button class="primary-button outcome-continue" type="button" data-action="close-outcome"><span>${o.died ? 'View my life' : 'Continue'}</span><span class="button-icon">${icon('arrow', 19)}</span></button></section></div>`;
    }
    function menuModal() {
        const c = Engine.state.character;
        return `<div class="overlay overlay-menu" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="menu-heading" class="menu-dialog dialog glass"><div class="dialog-top"><span class="dialog-breadcrumb">Menu</span><button class="dialog-close" type="button" data-action="close-modal" aria-label="Close menu">${icon('x', 20)}</button></div><h2 id="menu-heading">Your life, your call<span class="dot">.</span></h2><p class="menu-intro">Some decisions are more reversible than others.</p>${c ? `<button class="menu-link" data-action="${Engine.state.phase === 'dead' ? 'end' : 'overview'}">${icon('house', 20)}<span>${Engine.state.phase === 'dead' ? 'Life summary' : 'Back to my life'} <small>Return to the main dashboard</small></span>${icon('arrow', 17)}</button><button class="menu-link" data-action="dossier">${icon('user', 20)}<span>Character information <small>Birthplace, birthday, and life details</small></span>${icon('arrow', 17)}</button><button class="menu-link danger-menu" data-action="restart">${icon('rotate', 20)}<span>Start a new life <small>Replace this character and its save</small></span>${icon('arrow', 17)}</button>` : `<div class="menu-empty">Your story begins at character creation.</div>`}<div class="menu-upcoming"><span>Coming in future updates</span><div>${icon('lock', 14)} Assets <i></i> Relationships <i></i> Activities</div><p>Future sections are previews, not playable systems yet.</p></div></section></div>`;
    }
    function plannedModal() {
        const title = e(plannedSection);
        return `<div class="overlay" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="planned-heading" class="confirm-dialog dialog glass"><div class="dialog-top"><span class="dialog-breadcrumb">Coming later</span><button class="dialog-close" data-action="close-modal" type="button" aria-label="Close">${icon('x', 20)}</button></div><div class="confirm-icon">${icon('lock', 25)}</div><h2 id="planned-heading">${title} are coming.</h2><p>This space is reserved for a later beta. For now, your choices, story, money and vital stats are all playable.</p><button class="primary-button outcome-continue" type="button" data-action="close-modal">BACK TO LIFE ${icon('arrow', 18)}</button></section></div>`;
    }
    function dossierModal() {
        const c = Engine.state.character;
        const country = Engine.getCountry(c.country);
        return `<div class="overlay" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="dossier-heading" class="dossier-dialog dialog glass"><div class="dialog-top"><span class="dialog-breadcrumb">Character profile</span><button class="dialog-close" type="button" data-action="close-modal" aria-label="Close dossier">${icon('x', 20)}</button></div><div class="dossier-person">${avatar(c, true)}<div><span class="scenario-category">Your character</span><h2 id="dossier-heading">${e(Engine.fullName(c))}</h2><p>${e(c.gender)} · ${country.flag} ${e(country.adjective)}</p></div></div><div class="dossier-facts"><div><small>AGE</small><strong>${c.age} years</strong></div><div><small>DATE OF BIRTH</small><strong>${e(Engine.birthdayText(c.birthday))}</strong></div><div><small>HOME TOWN</small><strong>${e(c.city)}</strong></div><div><small>ZODIAC</small><strong>${e(Engine.zodiac(c.birthday))}</strong></div><div><small>BANK BALANCE</small><strong>${fmt(c.money)}</strong></div><div><small>STORIES ON RECORD</small><strong>${Engine.state.history.length}</strong></div></div><button class="primary-button outcome-continue" data-action="close-modal">Back to life ${icon('arrow', 18)}</button></section></div>`;
    }
    function restartModal() {
        return `<div class="overlay" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="restart-heading" class="confirm-dialog dialog glass"><div class="confirm-icon">${icon('rotate', 25)}</div><h2 id="restart-heading">Another life?</h2><p>Starting over permanently replaces this character and their entire timeline in this browser. There is no convenient time machine.</p><div class="confirm-actions"><button class="secondary-button" data-action="close-modal">KEEP THIS LIFE</button><button class="danger-button" data-action="confirm-restart">START NEW LIFE ${icon('arrow', 16)}</button></div></section></div>`;
    }
    function deathView() {
        const c = Engine.state.character;
        const history = Engine.state.history.filter(item => item.choice);
        return `${topbar(true)}<main class="death-main"><section class="death-hero glass animate-up" id="end-of-life"><div class="death-star">✳</div><div class="death-eyebrow"><span></span> THE Final chapter <span></span></div><div class="death-title">The end.</div><div class="death-years">${c.age} <span>YEARS ON EARTH</span></div><h1>${e(Engine.fullName(c))}</h1><p>${e(Engine.state.deathReason || '')}</p><div class="death-divider"></div><blockquote>“${e(Engine.summary(c))}”</blockquote><div class="death-numbers"><div><span>FINAL BALANCE</span><strong>${fmt(c.money)}</strong></div><div><span>CHAPTERS WRITTEN</span><strong>${Engine.state.history.length - 1}</strong></div></div><div class="death-stats">${Model.statKeys.map(k => `<div><span>${labelStat[k]}</span><strong>${c.stats[k]}</strong><i class="${statColor[k]}" style="width:${c.stats[k]}%"></i></div>`).join('')}</div><div class="death-recent"><span>LAST KNOWN ADVENTURES</span>${history.slice(-3).reverse().map(h => `<div><small>AGE ${h.age}</small>${e(h.title)}</div>`).join('')}</div><button class="primary-button death-restart" data-action="restart"><span>START A NEW LIFE</span><span class="button-icon">${icon('arrow', 19)}</span></button><div class="afterword">EVERY STORY ENDS. ANOTHER ONE CAN BEGIN.</div></section></main><footer class="page-footer"><span>LIFE-ISH · YOUR STORY CONTINUES</span><span>ONE LIFE AT A TIME</span></footer>`;
    }
    function render() {
        const scroll = document.getElementById('timeline-scroll');
        if (scroll)
            timelineScroll = scroll.scrollTop;
        root.innerHTML = `<div class="app-shell ${Engine.state.phase === 'playing' ? 'dashboard-shell' : Engine.state.phase === 'create' ? 'creator-shell' : ''}">${Engine.state.phase === 'create' ? createView() : Engine.state.phase === 'dead' && !Engine.state.resolution ? deathView() : gameView()}${Engine.state.activeScenarioId ? scenarioModal() : Engine.state.resolution ? outcomeModal() : modal === 'menu' ? menuModal() : modal === 'dossier' && Engine.state.character ? dossierModal() : modal === 'restart' ? restartModal() : modal === 'planned' ? plannedModal() : ''}</div>`;
        const next = document.getElementById('timeline-scroll');
        if (next) {
            next.scrollTop = jumpToLatest ? next.scrollHeight : timelineScroll;
            jumpToLatest = false;
        }
        document.body.classList.toggle('modal-open', !!Engine.state.activeScenarioId || !!Engine.state.resolution || !!modal);
        const dialog = document.querySelector('[role="dialog"]');
        if (dialog) {
            const target = dialog.querySelector('button:not(:disabled)');
            target?.focus({ preventScroll: true });
        }
    }
    UI.render = render;
    function scrollTo(target) {
        modal = null;
        render();
        requestAnimationFrame(() => {
            const el = document.getElementById(target);
            el?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        });
    }
    function onClick(event) {
        const button = event.target.closest('[data-action]');
        if (!button || !['toggle-place', 'pick-place'].includes(button.dataset.action || ''))
            closePlaceMenus();
        if (!button || button.hasAttribute('disabled'))
            return;
        const action = button.dataset.action;
        switch (action) {
            case 'toggle-place':
                togglePlaceMenu(button.dataset.kind);
                break;
            case 'pick-place':
                pickPlace(button.dataset.kind, button.dataset.value || '');
                break;
            case 'begin-life': {
                event.preventDefault();
                const form = document.getElementById('create-form');
                if (form)
                    beginLife(form);
                break;
            }
            case 'menu':
                modal = 'menu';
                render();
                break;
            case 'planned':
                plannedSection = button.dataset.section || 'Assets';
                modal = 'planned';
                render();
                break;
            case 'close-modal':
                modal = null;
                render();
                break;
            case 'overview':
                scrollTo('overview');
                break;
            case 'end':
                scrollTo('end-of-life');
                break;
            case 'timeline':
                scrollTo('timeline');
                break;
            case 'stats':
                scrollTo('stats');
                break;
            case 'dossier':
                modal = 'dossier';
                render();
                break;
            case 'restart':
                modal = 'restart';
                render();
                break;
            case 'confirm-restart':
                Engine.restart();
                modal = null;
                timelineScroll = 0;
                window.scrollTo(0, 0);
                render();
                break;
            case 'age':
                if (Engine.ageUp()) {
                    modal = null;
                    render();
                }
                break;
            case 'choice': {
                const index = Number(button.dataset.index);
                if (Engine.choose(index)) {
                    jumpToLatest = true;
                    render();
                }
                break;
            }
            case 'close-outcome':
                Engine.closeResolution();
                modal = null;
                render();
                break;
        }
    }
    function beginLife(form) {
        // A direct button action avoids relying on an implicit native form submission,
        // while the submit listener below still supports keyboard/assistive-tech activation.
        const input = (name) => form.elements.namedItem(name);
        // These are deliberately not username-like named inputs: browser password
        // managers should not interpret character names as login credentials.
        const first = form.querySelector('[data-character-field="first"]');
        const last = form.querySelector('[data-character-field="last"]');
        const city = input('city');
        const country = input('country');
        const gender = form.querySelector('input[name="gender"]:checked');
        const error = form.querySelector('#form-error');
        form.dataset.validationRequested = 'true';
        validateCreatorNames(form);
        const nameMissing = !first?.value.trim() || !last?.value.trim();
        if (nameMissing) {
            (first?.value.trim() ? last : first)?.focus();
            return;
        }
        if (!city?.value.trim()) {
            city?.setAttribute('aria-invalid', 'true');
            if (error)
                error.textContent = 'Please select a city of birth.';
            return;
        }
        const success = Engine.start({
            firstName: first.value,
            lastName: last.value,
            city: city.value,
            country: country?.value || Engine.countries[0].name,
            gender: (gender?.value || 'Male')
        });
        if (!success) {
            if (error)
                error.textContent = 'Those details did not work. Please review your character and try again.';
            return;
        }
        modal = null;
        timelineScroll = 0;
        render();
        try {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        catch { /* Some embedded viewers do not allow scrolling. */ }
    }
    function onSubmit(event) {
        const form = event.target;
        if (form.id !== 'create-form')
            return;
        event.preventDefault();
        beginLife(form);
    }
    function validateCreatorNames(form) {
        const fields = Array.from(form.querySelectorAll('[data-character-field]'));
        const missing = fields.filter(field => !field.value.trim());
        fields.forEach(field => {
            const invalid = !field.value.trim();
            field.setAttribute('aria-invalid', String(invalid));
            field.closest('.field')?.classList.toggle('is-invalid', invalid);
        });
        const error = form.querySelector('#form-error');
        if (error)
            error.textContent = missing.length === 2
                ? 'Please enter a full name to begin your life.'
                : missing.length === 1
                    ? `Please enter a ${missing[0].dataset.characterField === 'first' ? 'first' : 'last'} name to begin your life.`
                    : '';
    }
    function onInput(event) {
        const field = event.target;
        const form = field.closest('#create-form');
        if (!form)
            return;
        if (form.dataset.validationRequested === 'true')
            validateCreatorNames(form);
        updateBeginGlow();
    }
    function updateBeginGlow() {
        const first = document.querySelector('[data-character-field="first"]');
        const last = document.querySelector('[data-character-field="last"]');
        document.querySelector('.creator-shell .create-button')?.classList.toggle('is-ready', !!first?.value.trim() && !!last?.value.trim());
    }
    function closePlaceMenus() {
        document.querySelectorAll('.place-picker.is-open').forEach(picker => {
            picker.classList.remove('is-open', 'open-above');
            const panel = picker.querySelector('.place-panel');
            if (panel)
                panel.hidden = true;
            picker.querySelector('.place-trigger')?.setAttribute('aria-expanded', 'false');
            picker.closest('.field')?.classList.remove('place-field-open');
        });
    }
    function togglePlaceMenu(kind, focusOption = false) {
        const picker = document.querySelector(`.place-picker[data-picker="${kind}"]`);
        if (!picker)
            return;
        const open = picker.classList.contains('is-open');
        closePlaceMenus();
        if (open)
            return;
        const panel = picker.querySelector('.place-panel');
        const trigger = picker.querySelector('.place-trigger');
        if (!panel || !trigger)
            return;
        panel.hidden = false;
        picker.classList.add('is-open');
        picker.closest('.field')?.classList.add('place-field-open');
        trigger.setAttribute('aria-expanded', 'true');
        // Flip above on smaller screens so the options do not run behind the button.
        const bounds = panel.getBoundingClientRect();
        const above = trigger.getBoundingClientRect().top;
        if (bounds.bottom > innerHeight - 15 && above > bounds.height + 8)
            picker.classList.add('open-above');
        if (focusOption)
            panel.querySelector('.place-option.is-selected, .place-option')?.focus();
    }
    function pickPlace(kind, value) {
        const available = kind === 'country' ? Engine.countries.map(c => c.name) : Engine.citiesByCountry[document.getElementById('country').value] || [];
        if (!available.includes(value))
            return;
        const picker = document.querySelector(`.place-picker[data-picker="${kind}"]`);
        const hidden = picker?.querySelector(`input[name="${kind}"]`);
        if (!picker || !hidden)
            return;
        const changed = hidden.value !== value;
        hidden.value = value;
        const selection = picker.querySelector('.place-trigger-selection');
        if (selection)
            selection.textContent = value;
        const trigger = picker.querySelector('.place-trigger');
        if (kind === 'country') {
            trigger?.classList.add('has-country-flag');
            if (trigger)
                trigger.dataset.country = value;
        }
        else {
            trigger?.classList.add('has-city-photo');
            if (trigger)
                trigger.dataset.city = value;
        }
        picker.querySelectorAll('.place-option').forEach(option => {
            const selected = option.dataset.value === value;
            option.classList.toggle('is-selected', selected);
            option.setAttribute('aria-pressed', String(selected));
        });
        if (kind === 'country' && changed) {
            const city = document.getElementById('city');
            const cities = Engine.citiesByCountry[value];
            city.value = cities[0];
            const cityPicker = document.querySelector('.place-picker[data-picker="city"]');
            const cityTrigger = cityPicker?.querySelector('.place-trigger');
            cityTrigger?.classList.add('has-city-photo');
            if (cityTrigger)
                cityTrigger.dataset.city = cities[0];
            const cityLabel = cityPicker?.querySelector('.place-trigger-selection');
            if (cityLabel)
                cityLabel.textContent = cities[0];
            const panel = cityPicker?.querySelector('.place-options');
            if (panel)
                panel.innerHTML = cities.map(c => placeOption('city', c, c === cities[0])).join('');
        }
        closePlaceMenus();
        picker.querySelector('.place-trigger')?.focus();
        hidden.removeAttribute('aria-invalid');
        const error = document.getElementById('form-error');
        if (error)
            error.textContent = '';
    }
    function start() {
        root.addEventListener('click', onClick);
        root.addEventListener('submit', onSubmit);
        root.addEventListener('input', onInput);
        root.addEventListener('pointermove', ev => {
            if (ev.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches)
                return;
            const brand = ev.target.closest('.creator-shell .brand');
            if (!brand)
                return;
            const b = brand.getBoundingClientRect();
            brand.style.setProperty('--tilt-y', `${((ev.clientX - b.left) / b.width - .5) * 19}deg`);
            brand.style.setProperty('--tilt-x', `${(.5 - (ev.clientY - b.top) / b.height) * 13}deg`);
        });
        root.addEventListener('pointerout', ev => {
            const brand = ev.target.closest('.creator-shell .brand');
            if (brand && !(ev.relatedTarget instanceof Node && brand.contains(ev.relatedTarget))) {
                brand.style.removeProperty('--tilt-x');
                brand.style.removeProperty('--tilt-y');
            }
        });
        document.addEventListener('keydown', ev => {
            const activePicker = document.querySelector('.place-picker.is-open');
            if (activePicker && ev.key === 'Escape') {
                ev.preventDefault();
                const trigger = activePicker.querySelector('.place-trigger');
                closePlaceMenus();
                trigger?.focus();
                return;
            }
            if (ev.target instanceof HTMLElement && ev.target.matches('.place-trigger') && ['ArrowDown', 'Enter', ' '].includes(ev.key)) {
                ev.preventDefault();
                togglePlaceMenu(ev.target.closest('.place-picker').dataset.picker, true);
                return;
            }
            if (activePicker && ev.target instanceof HTMLElement && ev.target.closest('.place-option') && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(ev.key)) {
                ev.preventDefault();
                const choices = Array.from(activePicker.querySelectorAll('.place-option'));
                const index = choices.indexOf(ev.target.closest('.place-option'));
                const next = ev.key === 'Home' ? 0 : ev.key === 'End' ? choices.length - 1 : (index + (ev.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length;
                choices[next]?.focus();
                return;
            }
            if (ev.key === 'Escape' && modal && !Engine.hasActiveDecision()) {
                modal = null;
                render();
            }
            if (ev.key === 'Tab') {
                const dialog = document.querySelector('[role="dialog"]');
                if (!dialog)
                    return;
                const focusable = Array.from(dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex="0"]'));
                if (!focusable.length)
                    return;
                const first = focusable[0], last = focusable[focusable.length - 1];
                if (ev.shiftKey && document.activeElement === first) {
                    ev.preventDefault();
                    last.focus();
                }
                else if (!ev.shiftKey && document.activeElement === last) {
                    ev.preventDefault();
                    first.focus();
                }
            }
        });
        render();
    }
    UI.start = start;
})(UI || (UI = {}));
// Boot when DOM is ready, including script injection after page load.
function bootLifeish() {
    try {
        UI.start();
    }
    catch (err) {
        console.error('Life-ish could not start:', err);
        const holder = document.getElementById('app');
        if (holder)
            holder.innerHTML = '<div class="app-unavailable"><h1>Life-ish</h1><p>Could not start the game in this viewer. Open the file in a full browser.</p></div>';
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootLifeish, { once: true });
}
else {
    bootLifeish();
}