var DomainWAX = ['HTTPS://WAX.PINK.GG', 'HTTPS://CHAIN.WAX.IO'];
var randomDomainwax = DomainWAX[Math.floor(Math.random() * DomainWAX.length)];
var Domainss = ['https://wax.cryptolions.io', 'https://api.waxsweden.org'];
var randomDomainss = Domainss[Math.floor(Math.random() * Domainss.length)];
var DomainAtom = ['https://alienworlds.mypinata.cloud/ipfs/', 'https://alienworlds.mypinata.cloud/ipfs/'];
//'https://alienworlds.mypinata.cloud/ipfs/','https://ipfs.io/ipfs/'
var randomDomainAtom = DomainAtom[Math.floor(Math.random() * DomainAtom.length)];
var atomic_api = [
   // 'https://wax-atomic.wizardsguild.one', 
   // 'https://api.wax-aa.bountyblok.io',
   // 'https://aa.wax.blacklusion.io',
	'https://wax.api.atomicassets.io',
//	'https://wax3.api.atomicassets.io'
]
var randomatomic_api = atomic_api[Math.floor(Math.random() * atomic_api.length)];
class bot {
    constructor() {
        this.isBotRunning = false;
        this.alertCaptcha = false;
        // this.checkCpuPercent = 90;
        // this.timerDelay = 810000;
        // this.timerDelayCpu = 180000;
        this.checkMinedelay = false;
        this.firstMine = true;
        this.previousMineDone = false;
        this.lineToken = '';
        this.lineBypassUrl = 'https://notify-gateway.vercel.app/api/notify';
        // this.serverGetNonce = 'alien';
        this.interval;
        this.autoClaimnfts;
        this.waitMine;
        this.checkInvalid;
        this.claims = new claims();
        this.checkExpire = true;
        this.i = 0;
        this.e = 0;
        this.b = 0;
        this.c = 0;
        this.m = 0;
        this.w = 0;
        this.z = 0;
    }

    delay = (millis) =>
        new Promise((resolve, reject) => {
            setTimeout((_) => resolve(), millis);
        });

    isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    async postData(urls = '', data = {}, method = 'POST', header = { 'Content-Type': 'application/json' }, returnMode = 'json') {
        try {
            // Object.assign(header,{'pragma':'no-cache' ,'cache-control':'no-cache'})
            const init = (method == 'POST') ? { method: method, mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: header, redirect: 'follow', referrerPolicy: 'no-referrer', body: JSON.stringify(data) } : { method: method, mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: header, redirect: 'follow', referrerPolicy: 'no-referrer' }
            if (returnMode == 'json') {
                const response = await fetch(urls, init);
                return response.json(); // parses JSON response into native JavaScript objects
            } else {
                const response = await fetch(urls, init).then(function(response) {
                        if (response.ok) {
                            return response.text();
                        }

                        throw new Error('Something went wrong.');
                    })
                    .then(function(text) {
                        console.log('Request successful', text);
                        return text;
                    })
                    .catch(function(error) {
                        console.log('Request failed', error);
                        return '';
                    });

                return response
            }
        } catch (err) {
            console.log(`Error:${err.message}`)
            return false;
        }
    }
    async checkCPU() {
        if (document.getElementById("litemode").checked == false) {
            let result = true
            let accountDetail = {}
            while (result) {
                accountDetail = await this.postData(randomDomainwax + '/v1/chain/get_account', { account_name: wax.userAccount }) //https://api.waxsweden.org
                if (accountDetail) {
                    this.i++;
                    const rawPercent = ((accountDetail.cpu_limit.used / accountDetail.cpu_limit.max) * 100).toFixed(0)
                        // console.log(`%c[Bot] rawPercent : ${rawPercent}%`, 'color:green')
                    const ms = accountDetail.cpu_limit.max - accountDetail.cpu_limit.used;
                    this.appendMessage(`ค่า CPU ${rawPercent} % : ${ms} ms`)
                    document.getElementById("text-balance-cpu").innerHTML = `${rawPercent}%`
                    if (rawPercent < parseInt(document.getElementById("cpu").value)) {
                        result = false;
                        this.i = 0;
                    } else if (this.i == 1) {
                        this.appendMessage(`ตรวจครั้งที่  ${this.i} ค่า CPU ${rawPercent}% : ${ms} ms`)
                        document.getElementById("text-status-error").innerHTML = `ค่า CPU ${rawPercent}% : ${ms} ms `;
                        await this.stacksMax();
                    } else if (this.i == 2) {
                        this.appendMessage(`ตรวจครั้งที่  ${this.i} ค่า CPU ${rawPercent}% : ${ms} ms`)
                        this.appendMessage(`ขุดเลยเพื่อป้องกัน BUG CPU`)
                        document.getElementById("text-status-error").innerHTML = `ค่า CPU ${rawPercent}% : ${ms} ms`;
                        result = false;
                    } else if (this.i == 3) {
                        this.appendMessage(`ตรวจครั้งที่  ${this.i} ค่า CPU ${rawPercent}% : ${ms} ms`)
                        document.getElementById("text-status-error").innerHTML = `ค่า CPU ${rawPercent}% : ${ms} ms `;
                    } else if (this.i == 4) {
                        this.appendMessage(`ตรวจครั้งที่  ${this.i} ค่า CPU ${rawPercent}% : ${ms} ms`)
                        document.getElementById("text-status-error").innerHTML = `ค่า CPU ${rawPercent}% : ${ms} ms`;
                    } else if (this.i == 5) {
                        var stopvalue = parseInt(document.getElementById("stop").value);
                        if (stopvalue == 0) {
                            this.i = 0;
                            this.appendMessage(`ไม่ต้องการพัก BOT`)
                        } else if (stopvalue > 0) {
                            this.i = 0;
                            window.location.href = "https://tlmminer.com/block/" + stopvalue;
                        }

                    }
                }
                if (result && accountDetail) {
                    const randomTimer = Math.floor(Math.random() * 3000)
                    const timerDelayCpu = (parseFloat(document.getElementById("cpu-timer").value) * 60) * 1000
                    this.appendMessage(`จะเช็คค่า CPU อีก  ${Math.ceil(timerDelayCpu/1000/60)} นาที`)
                    document.getElementById("text-status").innerHTML = `CPU เต็มจะเช็คอีก  ${Math.ceil(timerDelayCpu/1000/60)} นาที`;
                    this.countDown(timerDelayCpu + randomTimer)
                    await this.delay(timerDelayCpu + randomTimer);
                }
            }
        }
    }

    appendMessage(msg, box = '') {
        const dateNow = moment().format('• dd DD/MM/YY  H:mm ');
        const boxMessage = document.getElementById("box-message" + box)
        boxMessage.value += '\n' + `${dateNow} : ${msg}`
        boxMessage.scrollTop = boxMessage.scrollHeight;
    }

    countDown(countDown) {
        clearInterval(this.interval);
        let countDownDisplay = Math.floor(countDown / 1000)
        this.interval = setInterval(function() {
            document.getElementById("text-cooldown").innerHTML = countDownDisplay + " วินาที"
            document.getElementsByTagName('title')[0].text = "• " + wax.userAccount + " • " + countDownDisplay + " วินาที  • TLMMiner ป้องกัน BAN IP ลื่น ๆ ปลอดภัย  "
            countDown = countDown - 1000;
            countDownDisplay = Math.floor(countDown / 1000)
            if (countDown < 1000) {
                clearInterval(this.interval);
                document.getElementById("text-cooldown").innerHTML = "0 วินาที";
            }
            if (countDownDisplay < -300) {
                clearInterval(this.interval);
                location.reload()
            }
        }, 1000);
    }

    async stop() {
        this.isBotRunning = false;
        this.appendMessage("หยุดการทำงาน")
            // console.log(`%c[Bot] stop`, 'color:green');
    }

    async start() {
        try { //dev
            if (document.getElementById("litemode").checked == true) {
			let aa = 20
			this.appendMessage(`ตั้งค่า : หน่วง Login ${aa} วินาที`)
			document.getElementById("text-status").innerHTML = `หน่วง Login ( เฉพาะ Litemode)  !!!`;
			document.getElementById("text-status-error").innerHTML = `ระยะเวลาสุ่ม ${aa} วินาที ลดปัญหาติดจอขาว !!`;
            this.countDown((20 * 1) * 1000)
            await this.delay((20 * 1) * 1000)
			}
            this.waitMineReload();
            const userAccount = await wax.login();
			 clearInterval(this.waitMine);
            this.appendMessage(`ตั้งค่า : ได้รับการตอบสนองแล้ว !!`)
            await this.delay(2000);
            document.getElementById("text-user").innerHTML = userAccount
                //document.getElementsByTagName('title')[0].text = "•" + userAccount + "• TLMMiner ป้องกัน BAN IP ลื่น ๆ ปลอดภัย  "
            const balance = await getBalance(wax.userAccount, wax.api.rpc);
            document.getElementById("text-balance").innerHTML = balance
            this.WaxNew();
            this.stacks();
            this.Cpu_fix();
            this.pic_land();
			this.nft_drop();
            if (document.getElementById("litemode").checked == false) {
                //this.checkall_random();
                //this.pic_tlm();
                //this.pic_tlm2();
                await this.username();
            } else {
                this.appendMessage(`Lite Mode ปิดการทำงานดึง API ทั้งหมด`)
            }
            if (this.e > 5) {
                this.e = 0;
                document.getElementById("awmode").checked = true;
                saveConfig()
                this.appendMessage(`เปิด : AWMODE ไม่ดึงค่า API ขุดอย่างเดียว !!`)
                window.location.href = "https://tlmminer.com/aw"
            }

            this.checkMinedelay = true;
            this.isBotRunning = true;
            await this.delay(1000);
            if (document.querySelector('input[name="server"]:checked').value === 'ok-nonce' && this.checkExpire == true) {
                const dataExpire = await this.postData(`https://mine.tlmminer.com/check-expire?wallet=${wax.userAccount}`, {}, 'GET', {}, 'text')
                this.checkExpire = false;

                if (dataExpire.indexOf("2022") || ("2021") || ("2023") > -1) {
                    const EXP = dataExpire.slice(0, 10);
                    document.getElementById("text-vip").innerHTML = '<i class="fas fa-crown"></i> VIP ' + EXP
					document.getElementById("item_tlms0").src = 'https://tlmminer.com/image/NFT.jpg';
					document.getElementById('ok-nonce').checked = true
					document.getElementById("text-status-error").innerHTML = '<i class="fas fa-crown"></i> VIP ' + EXP
                }
                if (dataExpire.indexOf("หมดอายุ") > -1) {
                    this.nftvip();
                    document.getElementById("text-vip").innerHTML = '<i class="fas fa-ban"></i> ไม่ใช่ VIP'
					document.getElementById("item_tlms0").src = 'https://tlmminer.com/image/novip.jpg';
					document.getElementById('alien').checked = true
					document.getElementById("text-status-error").innerHTML = '<i class="fas fa-ban"></i> ไม่ใช่ VIP'

                }
                if (dataExpire.indexOf("นี้ยัง") > -1) {
                    document.getElementById("text-vip").innerHTML = '<i class="fas fa-crown"></i> ขุดเพื่อเปิดใช้งาน'
					document.getElementById("item_tlms0").src = 'https://tlmminer.com/image/novip.jpg';
					document.getElementById('ok-nonce').checked = true
					document.getElementById("text-status-error").innerHTML = 'ยังไม่เปิดใช้งานขุดเพื่อเปิดใช้งาน TLMINER VIP'
                }

            }
            // console.log("bot StartBot");
            document.getElementById("text-status").innerHTML = `<i class='fas fa-check-circle'></i> ล็อคอินสำเร็จแล้ว`;
            this.appendMessage("เข้าสู่ระบบเรียบร้อย")
            while (this.isBotRunning) {
                let minedelay = 1;
                do {
                    const timerDelay = (parseFloat(document.getElementById("timer").value) * 60) * 1000
                    if (timerDelay != 0) {
                        if (this.checkMinedelay) {
                            minedelay = timerDelay;
                        }
                    } else {
                        minedelay = await getMineDelay(userAccount);
                    }
                    if (isNaN(minedelay) && document.getElementById("litemode").checked == false) {
						if (this.x == 3) {
                        this.e++
						document.getElementById("text-status").innerHTML = `<i class='fas fa-times-circle'></i> Error NAN`;
						document.getElementById("text-status-error").innerHTML = `ดึง API LAND & ITEM ขุดไม่ได้ !!!`;
                        this.appendMessage(`Error : NAN Error`)
						this.appendMessage(`ดึง API LAND หรือ ITEM ขุดไม่เจอ หาก SET LAND แล้วไม่หาย ให้ เปลี่ยน API หรือ `)
						this.appendMessage(`ทำการเปลี่ยน LAND ใหม่และ เปลี่ยน IP หรือไม่ก็เชื่อมต่อ VPN`)
                        this.appendMessage(`เปลี่ยน SERVER WAX AUTO & Reload ภายใน 10 วินาที`)
						await this.delay(10000);
						document.getElementById("awmode").checked = true;
						saveConfig()
						window.location.href = "https://tlmminer.com/aw"
						} else { 
						this.x++
						this.appendMessage(`Error : NAN ครั้งที่ ${this.x} `)
						this.appendMessage(`ดึง API LAND หรือ ITEM ขุดไม่เจอ หาก SET LAND แล้วไม่หาย ให้ เปลี่ยน API หรือ `)
						this.appendMessage(`ทำการเปลี่ยน LAND ใหม่และ เปลี่ยน IP หรือไม่ก็เชื่อมต่อ VPN`)
						this.appendMessage(`หาก Error NAN มากกว่า 3 ครั้งจะ  เปลี่ยน API ให้ AUTO`)
						}
					}

                    const RandomTimeWait = minedelay + Math.floor(1000 + (Math.random() * 9000))
                    this.countDown(minedelay)
                    this.appendMessage(`ระยะเวลาในการขุด ${Math.ceil((RandomTimeWait / 1000)/60)} นาที`)
                    document.getElementById("text-status").innerHTML = `ระยะเวลาในการขุด ${Math.ceil((RandomTimeWait / 1000)/60)} นาที`;
                    await this.delay(RandomTimeWait);
                    minedelay = 0;

                } while (minedelay !== 0 && (this.previousMineDone || this.firstMine));
                await this.CheckMine()
            }

        } catch (err) {
            this.appendMessage(`ไม่สำเร็จ (เข้าสู่ระบบ) : ${err.message}`)
            document.getElementById("text-status").innerHTML = `<i class='fas fa-times-circle'></i> ล็อคอินไม่สำเร็จ`;
            if (this.alertCaptcha) {
                const audio = new Audio('https://tlmminer.com/sounds/error.mp3');
                audio.play();
            }
			if (err.message.indexOf("transaction net usage is too high") > -1) {
                document.getElementById("text-status-error").innerHTML = `กรุณา STAKE NET 0.1 WAX`;
				window.open('https://wax.bloks.io/wallet/resources/stake', '_blank');
	                Swal.fire({
                    icon: 'error',
                    title: 'กรุณา STAKE NET..',
                    text: 'จะเด้งไปหน้าเว็บ STAKE NET ออโต้',
                    showConfirmButton: false,
                    timer: 10000
                })
            }
            if (err.message.indexOf("Unexpected token < in JSON at position 0") > -1) {
                document.getElementById("text-status-error").innerHTML = `Unexpected token `;
                this.e++;
                const currentWaxDomain = indexWaxDomain ? parseInt(indexWaxDomain) + 1 : 1
                console.log('currentWaxDomain', currentWaxDomain)
                localStorage.setItem('waxDomain', (currentWaxDomain <= waxDomain.length ? currentWaxDomain : 0))
                location.reload()
            }
            if (err.message.indexOf("Cannot read properties of undefined") > -1) {
                document.getElementById("text-status-error").innerHTML = `undefined `;
                this.e++;
                const currentWaxDomain = indexWaxDomain ? parseInt(indexWaxDomain) + 1 : 1
                console.log('currentWaxDomain', currentWaxDomain)
                localStorage.setItem('waxDomain', (currentWaxDomain <= waxDomain.length ? currentWaxDomain : 0))
                location.reload()
            }
            if (err.message.indexOf("Cannot read property 'length' of undefined") > -1) {
                this.e++;
                const currentWaxDomain = indexWaxDomain ? parseInt(indexWaxDomain) + 1 : 1
                console.log('currentWaxDomain', currentWaxDomain)
                localStorage.setItem('waxDomain', (currentWaxDomain <= waxDomain.length ? currentWaxDomain : 0))
                this.countDown(2000)
                await this.delay(2000);
                location.reload()
            }

            if (err.message.indexOf("Failed to fetch") > -1) {
                document.getElementById("text-status-error").innerHTML = `Failed to fetch `;
                this.e++;
                this.appendMessage(`จะกลับทำงานภายใน 10 วินาที `)
                this.appendMessage(`Error ครั้งที่  ${this.e}`)
                this.appendMessage(`หากครบ 3 ครั้งจะ เปลี่ยน SERVER WAX ให้ AUTO`)
                this.countDown(10000)
                await this.delay(10000);
                this.start();
            }
            if (err.message.indexOf("Unable to open a popup window") > -1) {
                document.getElementById("text-status-error").innerHTML = `ไม่ได้เปิด POPUP`;
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณาเปิด Popup..',
                    text: 'จะกลับไปทำงานอีก 10 วินาที',
                    showConfirmButton: false,
                    timer: 10000
                })
                this.countDown(10000);
                await this.delay(10000);
                location.reload()
            }
			else {
			//location.reload()
			}
        }
    }


    async CheckMine() {
		this.checkMinedelay = true;
        document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็คตั้งค่าขุด`;
        this.appendMessage(`ระบบ : เช็คฟังชั่นก่อนขุดนับถอยหลัง 5 วินาที`)
        this.countDown(5000);
        this.timeopen();
        // CheckMine
	//	if (document.getElementById("litemode").checked == true) {
	//		var aa = this.getRandomInt(1, 60)
    //        this.appendMessage(`ตั้งค่า : LiteMode สุ่มก่อนขุด AUTO ${aa} วินาที`)
	//		document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> ฟังชั่นสุ่มก่อนขุด LiteMode !!!`;
	//		document.getElementById("text-status-error").innerHTML = `ระยะเวลาสุ่ม ${aa} นาที ออโต้ เพื่อลดจอขาว ..`;
	//		this.countDown((aa * 1) * 1000)
	//		await this.delay((aa * 1) * 1000)
	//	}
		
        if (document.getElementById("random-mine").checked == true) {
            var valueInput1 = document.getElementById("timemine-random1").value
            var aa = this.getRandomInt(1, valueInput1)
            this.appendMessage(`ตั้งค่า : ระยะเวลาในการสุ่มก่อนขุด ${aa} นาที`)
			document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> ฟังชั่นสุ่มก่อนขุด  !!!`;
			document.getElementById("text-status-error").innerHTML = `ระยะเวลาสุ่ม ${aa} นาที`;
            this.countDown((aa * 60) * 1000)
            await this.delay((aa * 60) * 1000)
        }


        if (this.c > 2 && document.getElementById("litemode").checked == true) {
            let stopvalue = parseInt(document.getElementById("stop").value);
            if (stopvalue == 0) {
                this.c = 0;
                this.appendMessage(`ไม่ต้องการพัก BOT`)
            } else if (stopvalue > 0) {
                this.c = 0;
                window.location.href = "https://tlmminer.com/block/" + stopvalue;
            }
        }


        if (this.b >= 5 && this.b < 9) {
            document.getElementById("text-status").innerHTML = `<i class="fas fa-ban"></i> ID ของคุณอาจโดน BAN `;
            document.getElementById("text-status-error").innerHTML = `กรุณาลองกด F5 ใหม่อีกครั้ง`;
            this.appendMessage(`AUTO UNSTAKE ทุก 24 ชั่วโมง`)
            await this.UnWax();
            Swal.fire({
                icon: 'error',
                title: 'เปิดระบบ UNSTAKE AUTO ...',
                text: 'จะ AUTO UnSTAKE อีก 24 ชั่วโมง',
                showConfirmButton: false,
                timer: 3600000 * 24
            })
            this.countDown(3600000 * 24)
            await this.delay(3600000 * 24);
        } else if (this.b >= 10 && this.b < 14) {

            this.appendMessage(`UnSTACK สำเร็จแล้วกรุณารอ 3 วัน`)
            this.appendMessage(`กรุณารอ 3 วัน ID ของคุณได้ UNSTACK ไปแล้ว`)
            this.appendMessage(`ระบบจะเช็ค Refund ทุก ๆ 4 ชั่วโมง`)
            Swal.fire({
                icon: 'success',
                title: 'UNSTACK สำเร็จแล้ว ...',
                text: 'รอ WAX เข้า 3 วัน จะเช็ค Refund ทุก ๆ 4 ชั่วโมง',
                showConfirmButton: true,
            })
            this.countDown(3600000 * 4)
            await this.delay(3600000 * 4);
        } else if (this.b >= 15) {

            this.appendMessage(`Refund สำเร็จแล้ว ...`)
            Swal.fire({
                icon: 'success',
                title: 'Refund สำเร็จแล้ว ...',
                text: 'ยินดีด้วย !! คุณได้รับยอดที่ UnStack แล้ว ',
                showConfirmButton: true,
            })
            this.countDown(3600000 * 2)
            await this.delay(3600000 * 2);
        }
		const serverGetNonce = document.querySelector('input[name="server"]:checked').value
		if (serverGetNonce == 'alien') {
		await minegod();
		}
		else {
		await this.Mine();
		}
    }
    async Mine() {
        const nonce = await this.getNonce()
        let actions = [{
            account: "m.federation",
            name: "mine",
            authorization: [{
                actor: wax.userAccount,
                permission: "active",
            }, ],
            data: {
                miner: wax.userAccount,
                nonce: nonce,
            },
        }, ];
        try {
			if (document.getElementById("litemode").checked == false) {
            if (parseInt(document.getElementById("cpu").value) != 0) {
                //  console.log("bot checkCPU2");
                document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็ค CPU`;
                await this.checkCPU(wax.userAccount);
            }
            var worldmine = parseInt(document.getElementById("world-mine").value);
            if (worldmine == 0) {
                this.appendMessage(`ไม่ต้องการตรวจเช็ค Mine Worlds `)
            } else if (worldmine == 1) {
                document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็ค Mine Worlds`;
                await this.mine_land1()
            } else if (worldmine == 2) {
                document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็ค Mine Worlds`;
                await this.mine_land2()
            } else if (worldmine == 3) {
                document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็ค Mine Worlds`;
                await this.mine_land3()
            } else if (worldmine == 4) {
                document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็ค Mine Worlds`;
                await this.mine_land4()
            } else if (worldmine == 5) {
                document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็ค Mine Worlds`;
                await this.mine_land5()
            } else if (worldmine == 6) {
                document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังเช็ค Mine Worlds`;
                await this.mine_land6()
            } else {
                this.appendMessage(`ไม่ต้องการตรวจเช็ค Mine Worlds `)
            }
			}
            this.appendMessage(`ระบบ : เริ่มทำการขุด !!!`)
            document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> กำลังขุด SV.TLMMINER VIP !!!`;
            const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
            //console.log(`%c[Bot] result is = ${result}`, 'color:green');
            if (result && result.processed) {
				document.getElementById("text-status").innerHTML = `ขุดสำเร็จ..`;
				document.getElementById("text-status-error").innerHTML = `<i class='fas fa-spinner fa-spin'></i> กำลังดึงค่าขุด...`;
                this.appendMessage(`ระบบ : ทำการขุดสำเร็จ !!`)
                this.appendMessage(`ระบบ : อัพเดทค่าการขุดนับถอยหลัง 10 วินาที`)
                this.countDown(10000);
                await this.delay(10000);
                const t_res = await this.postData(`https://wax.blokcrafters.io/v2/history/get_actions?account=${wax.userAccount}&skip=0&limit=1&sort=desc&transfer.to=${wax.userAccount}&transfer.from=m.federation`, {}, 'GET')
                let amount = 0
                const amounts = t_res.actions.filter(a => a.act.name === 'transfer').map(a => a.act).filter(a => a.data.to === wax.userAccount).map(a => a.data.quantity)
                amounts.forEach(a => amount += parseFloat(a))
                if (amounts != 0) {
                    this.b = 0;
                    this.appendMessage(amount.toFixed(4) + ' TLM', '2')
                    console.log(`ขุด New !! = ${amount.toFixed(4)} Url = ${t_res}`);
                    document.getElementById("text-status-error").innerHTML = `<i class="fab fa-ethereum"></i> ขุดล่าสุด  ${amount.toFixed(4)} TLM`;
				} else {
                    let mined_amount = 0;
					let account = wax.userAccount
                    result.processed.action_traces[0].inline_traces.forEach((t) => {
                        if (t.act.account === 'alien.worlds' && t.act.name === 'transfer' && t.act.data.to === account) {
                            const [amount_str] = t.act.data.quantity.split(' ');
                            mined_amount += parseFloat(amount_str);
                            this.b = 0;
                        }
                    });
                    this.appendMessage(mined_amount.toString() + ' TLM', '2')
                    document.getElementById("text-status-error").innerHTML = `<i class="fab fa-ethereum"></i> ขุดล่าสุด  ${mined_amount.toString()} TLM`;
                    console.log(`ขุดOld !! : ${mined_amount}`)
                }
				
				
				
                this.firstMine = false;
                this.previousMineDone = true;
                this.checkMinedelay = true;
                this.m++;
                if (this.m == 5 && document.getElementById("litemode").checked == false) {
                    this.m = 0;
                    this.WaxNew();
                    this.temp_mine();
                    this.pic_land()
                }
            }
        } catch (err) {
            console.log(`ไม่สำเร็จ (ระหว่างขุด) : ${err.message}`)
            this.previousMineDone = false;
            document.getElementById("text-status").innerHTML = `<i class='fas fa-times-circle'></i> ขุดไม่สำเร็จ`;
            if (err.message.indexOf("Mine too soon") > -1) {
				this.checkMinedelay = true;
                document.getElementById("text-status-error").innerHTML = `Mine too soon`;
                this.appendMessage(`ไม่สำเร็จ "Mine too soon"จะกลับมาทำงานอีก 3 นาที `)
                this.appendMessage(`อุปกรณ์ขุดติดระยะเวลาจากตัวเก่า กรุณารอสักครู่... `)
                this.countDown(60000 * 1)
                await this.delay(60000 * 1);
            } else {
                this.checkMinedelay = false;
            }
            if (err.message.indexOf("INVALID_HASH") > -1) {
                document.getElementById("text-status-error").innerHTML = `INVALID_HASH`;
                this.appendMessage(`ไม่สำเร็จ "INVALID HASH" `)
                this.checkInvalid = true;
            }

            if (err.message.indexOf("NOTHING_TO_MINE") > -1) {
                //delay
                this.checkMinedelay = true;
                document.getElementById("text-status-error").innerHTML = ` แร่ในดาวหมด หรือ ตัวละครโดน BAN `;
                this.appendMessage(`ไม่สำเร็จ "NOTHING TO MINE" จะกลับมาทำงานอีก 1 นาที`)
                this.countDown(30000 * 2)
                await this.delay(30000 * 2);
            }

            if (err.message.indexOf("Failed to fetch") > -1) {
				this.checkMinedelay = true;
                document.getElementById("text-status-error").innerHTML = `ดึงค่าขุดไม่สำเร็จ !!!`;
                this.appendMessage(`ไม่สำเร็จ "Failed to fetch" จะกลับมาทำงานอีก 20 วินาที`)
                this.countDown(10000 * 2)
                await this.delay(10000 * 2);
                this.start()
            }
            if (err.message.indexOf("Cannot mine with an empty bag") > -1) {
                document.getElementById("text-status-error").innerHTML = `คุณไม่ได้ใส่ อปก. ขุด`;
                this.appendMessage(`คุณไม่ได้ใส่ ITEM ขุด กรุณาติดตั้ง ITEM ขุด จะกลับมาทำงานอีก 5 นาที`)
                this.countDown(60000 * 5)
                await this.delay(60000 * 5);
            }
            if (err.message.indexOf("maximum billable CPU time") > -1) {
                this.c++;
                document.getElementById("text-status-error").innerHTML = `CPU เต็ม`;
                if (document.getElementById("litemode").checked == true) {
                    let timer = document.getElementById("cpu-timer").value
                    this.appendMessage(`ตั้งค่า : จะขุดอีกในเวลา ${timer} นาที`)
                    this.appendMessage(`ตรวจสอบ CPU เต็ม ครั้งที่  ${this.c} `)
                    this.countDown((timer * 60) * 1000)
                    await this.delay((timer * 60) * 1000)
                }
                this.appendMessage(`ไม่สำเร็จ : CPU เต็ม กรุณา Stack CPU หรือ พัก BOT !!!`)
            }
            if (parseInt(document.getElementById("cpu").value) == 0) {
                const timerDelayCpu = (parseFloat(document.getElementById("cpu-timer").value) * 60) * 1000
                this.appendMessage(`ข้อผิดพลาดของ CPU กรุณารอ ${Math.ceil((timerDelayCpu / 1000)/60)} นาที`)
                this.countDown(timerDelayCpu)
                await this.delay(timerDelayCpu);
            }
        }


        const afterMindedBalance = await getBalance(wax.userAccount, wax.api.rpc);
        this.appendMessage(`ยอดรวมทั้งหมด ${afterMindedBalance}`)
            //this.autotransfer();

        document.getElementById("text-balance").innerHTML = afterMindedBalance

        //auto swap
        // if (parseFloat(afterMindedBalance) >= parseFloat(document.getElementById("amount-swap").value) && document.getElementById("auto-swap").checked == true && document.getElementById("litemode").checked == false) {
        //     await this.delay(5000);
        //     const amountSwap = (parseFloat(document.getElementById("amount-swap").value)).toFixed(4) + " TLM"
        //     this.swapwax(wax.userAccount, amountSwap)
        // }
    }

    async getNonce() {
        try {
            let nonce = null;
            let message = ''
            const serverGetNonce = document.querySelector('input[name="server"]:checked').value
            if (serverGetNonce !== 'alien') {
                let urlMine = 'https://server-mine-b7clrv20.an.gateway.dev/server_mine?' + '?wallet=' + wax.userAccount
                if (serverGetNonce == 'ninjamine-vip') {
                    urlMine = 'https://server-mine-b7clrv20.an.gateway.dev/server_mine_vip' + '?wallet=' + wax.userAccount
                } else if (serverGetNonce == 'ok-nonce') {
                    const bagDifficulty = await getBagDifficulty(wax.userAccount);
                    const landDifficulty = await getLandDifficulty(wax.userAccount);
                    let difficulty = bagDifficulty + landDifficulty;
                    let last_mine_tx = await lastMineTx(mining_account, wax.userAccount, wax.api.rpc);
                    last_mine_tx = this.checkIfValidSHA256(last_mine_tx) ? last_mine_tx : ''
                    difficulty = !isNaN(difficulty) ? difficulty : '0';
                    const hashfail = this.checkInvalid == true ? '1' : '0'
					
                    urlMine = `https://mine.tlmminer.com?wallet=${wax.userAccount}&hashfail=${hashfail}&last_mine_tx=${last_mine_tx}&difficulty=${difficulty}`
					console.log('urlMine', urlMine );
                    //urlMine = `https://mine.tlmminer.com?wallet=${wax.userAccount}&hashfail=` + (this.checkInvalid == true ? '1' : '0')
                }
                //console.log('urlMine', urlMine)
                nonce = await this.postData(urlMine, {}, 'GET', { Origin: "" }, 'raw')
                if (nonce !== '') {
                    if (serverGetNonce == 'ninjamine') {
                        message = 'Ninja limit: '
                    } else if (serverGetNonce == 'ninjamine-vip') {
                        message = 'คุณใช้งาน SV.Ninja NFT ในการขุด'
                    } else {
                        message = "คุณใช้งาน SV.TLMMINER VIP ในการขุด"
                        document.getElementById("text-status").innerHTML = "คุณใช้ TLMMINER VIP ในการขุด";
                    }
                }
                // console.log(message)
            }

            if (serverGetNonce == 'alien' || nonce == '') {
                const bagDifficulty = await getBagDifficulty(wax.userAccount);
                const landDifficulty = await getLandDifficulty(wax.userAccount);
                let difficulty = bagDifficulty + landDifficulty;
                let last_mine_tx = await lastMineTx(mining_account, wax.userAccount, wax.api.rpc);
                last_mine_tx = this.checkIfValidSHA256(last_mine_tx) ? last_mine_tx : ''
                difficulty = !isNaN(difficulty) ? difficulty : '0';
				let account = wax.userAccount
				console.log({mining_account, account,  difficulty, last_mine_tx });
                const mine_work = await doWorkWorker({mining_account, account,  difficulty, last_mine_tx })
                nonce = mine_work.rand_str
                console.log('nonce-alien', nonce)
                message = 'คุณใช้งาน TLMMINER ฟรี !!  ในการขุด '
                document.getElementById("text-status").innerHTML = "คุณใช้  TLMMINER ฟรี !!  ในการขุด";
                this.nftvip();
            }
            this.checkInvalid = false;
            this.appendMessage(`${message}`)
            return nonce;
        } catch (err) {
            this.appendMessage(`getNonce Error message : ${err.message}`)
            this.start()
        }
    }

    claimnftsController() {
        console.log('claimnftsController')
            //clearInterval(this.autoClaimnfts);
            // this.autoClaimnfts = setInterval(function() {
            //     var newBot = new bot()
            //     newBot.getClaimnfts('auto')
            // }, 1800000);
    }


    //	    CheckMineSce() {
    //        console.log('CheckMineSce')
    //        clearInterval(this.autoupdate);
    //         this.autoupdate = setInterval(function() {
    //             var newBot = new bot()
    //             newBot.checkMinetime();
    //         }, 1200000);
    //    }

    //	   async checkMinetime() {
    //if ( this.cooldown < -300){
    //		this.mine();
    //		}
    //	   }

    // async getClaimnfts(mode) {
    //     try {
    //         // document.getElementById("btn-claimn-nft").disabled = true
    //         const get_nft = await this.claims.getNFT(wax.userAccount, wax.api.rpc, aa_api)
    //         console.log('get_nft', get_nft)
    //         if (get_nft.length > 0) {
    //             let actions = [{
    //                 account: 'm.federation',
    //                 name: 'claimnfts',
    //                 authorization: [{
    //                     actor: wax.userAccount,
    //                     permission: 'active',
    //                 }],
    //                 data: {
    //                     miner: wax.userAccount
    //                 },
    //             }];

    //             await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
    //             for (const item of get_nft) {
    //                 this.appendMessage(item.name, '2')
    //             }
    //         } else {
    //             if (mode !== 'auto') {
    //                 this.appendMessage('คุณไม่ได้รับ NFT ...', '2')
    //             }
    //         }

    //         // document.getElementById("btn-claimn-nft").disabled = false
    //     } catch (err) {
    //         this.appendMessage(`ไม่สำเร็จ ClaimNFTS  : ${err.message}`)
    //     }
    // }

    // async data1() {
    //     const bb = this.getRandomInt(1, 10)
    ///      await this.delay((bb * 60) * 1000)
    //      await this.temp_mine();
    ///   }

    //  async data2() {
    //      const bb = this.getRandomInt(10, 20)
    //      await this.delay((bb * 60) * 1000)
    //       await this.temp_mine1();
    //   }

    //   async data3() {
    //       const bb = this.getRandomInt(20, 30)
    //       await this.delay((bb * 60) * 1000)
    //       await this.temp_mine2();
    //   }
    async updatex() {
        this.WaxNew();
        this.stacks();
        this.Cpu_fix();
        const balance = await getBalance(wax.userAccount, wax.api.rpc);
        document.getElementById("text-balance").innerHTML = balance
    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    waitMineReload() {
        console.log('waitMineReload')
        clearInterval(this.waitMine);
        this.waitMine = setInterval(function() {
            location.reload()
        }, 120000);
        this.appendMessage(`ตั้งค่า : หากไม่ Login ภายใน 2 นาที จะรีโหลดใหม่ !! `)
    }


    ///////////////////////// TLMMINER โค๊ดใหม่ทั้งหมด ////////////////


    async checkALL() {
        document.getElementById("checkall").disabled = true
        this.appendMessage("กำลังเช็คข้อมลูกรุณารอ 10 วินาที")
        this.WaxNew();
        this.nfs_tlm();
        this.nfs_tlm2();
        this.stacks();
        this.Cpu_fix();
        this.pic_bags();
        this.pic_faces();
        this.pic_crew();
        this.pic_tools();
        this.pic_arms();
        this.pic_land();
        //this.lock_bags();
        this.pic_coin();
        this.tools_all();
        this.pic_avatar();
 //       await this.temp_mine();
 //       await this.delay(3000);
 //       await this.temp_mine1();
 //       await this.delay(3000);
 //       await this.temp_mine2();
        this.appendMessage("เช็คข้อมลูทั้งหมดเรียบร้อยแล้ว..")
        document.getElementById("checkall").disabled = false
    }

    async checkall_random() {
        var bb = this.getRandomInt(1, 5)
        var temp1 = this.getRandomInt(5, 10)
        var temp2 = this.getRandomInt(10, 15)
        this.appendMessage(`ตั้งค่า : จะดึงข้อมลูการขุดทั้งหมดภายใน ${bb} นาที`)
        await this.delay((bb * 60) * 1000)
        await this.temp_mine();
        this.appendMessage(`ตั้งค่า : ดึงค่าขุดเมื่อวาน ภายใน ${temp1} นาที`)
        await this.delay((temp1 * 60) * 1000)
        await this.temp_mine1();
        this.appendMessage(`ตั้งค่า : ดึงค่าขุดเมื่อวานซีน ภายใน ${temp2} นาที`)
        await this.delay((temp2 * 60) * 1000)
        await this.temp_mine2();
        this.appendMessage("ดึงค่าการขุดทั้งหมดแล้ว..")
    }

    async timeopen() {
        let hour = new Date().getHours();
        let stopvalue = parseInt(document.getElementById("stopbot").value);
        let stophour = parseInt(document.getElementById("stopbot1").value);
        if (hour == stopvalue) {
            this.appendMessage(`กำลังพาคุณไปพัก BOT`)
            if (stophour == 0) {
                this.appendMessage(`คุณไม่ได้ตั้งเวลาพัก BOT`)
            } else if (stophour > 0) {
                let bb = this.getRandomInt(1, 10)
                await this.delay((bb * 60) * 1000)
                window.location.href = "https://tlmminer.com/block/" + stophour;
            }
        } else if (stopvalue < 25) {
            this.appendMessage(`เวลาที่คุณจะพัก ${stopvalue}.00 น.`)
        }
    }



    async getconfig() {
const _0x24c7=['log','config','525KyjvDA','success','1261853naqcaj','parse','getElementById','2279vyUmfR','copy','text-config','delay','143580KciZaz','fire','execCommand','602506yXxSPJ','select','388519twHBgC','597081eHKXvE','5nYFyII','สำเร็จ\x20','1CaamTj','106241FaDRKV','retrievedObject:\x20'];const _0x532b7a=_0x4dd8;(function(_0x9b743,_0x154c33){const _0x39b5fc=_0x4dd8;while(!![]){try{const _0x47e219=-parseInt(_0x39b5fc(0xef))*-parseInt(_0x39b5fc(0x100))+-parseInt(_0x39b5fc(0xf4))*-parseInt(_0x39b5fc(0xf9))+-parseInt(_0x39b5fc(0xf6))+parseInt(_0x39b5fc(0xed))*parseInt(_0x39b5fc(0xf0))+-parseInt(_0x39b5fc(0xfd))+parseInt(_0x39b5fc(0x102))+-parseInt(_0x39b5fc(0xec));if(_0x47e219===_0x154c33)break;else _0x9b743['push'](_0x9b743['shift']());}catch(_0x5887c4){_0x9b743['push'](_0x9b743['shift']());}}}(_0x24c7,0xaed9f),saveConfig(),await this[_0x532b7a(0xfc)](0x7d0));function _0x4dd8(_0x3ed073,_0x5e98cb){return _0x4dd8=function(_0x24c783,_0x4dd8a8){_0x24c783=_0x24c783-0xec;let _0x4e7814=_0x24c7[_0x24c783];return _0x4e7814;},_0x4dd8(_0x3ed073,_0x5e98cb);}let retrievedObject=localStorage['getItem'](_0x532b7a(0xf3));console[_0x532b7a(0xf2)](_0x532b7a(0xf1),JSON[_0x532b7a(0xf7)](retrievedObject)),document[_0x532b7a(0xf8)](_0x532b7a(0xfb))['value']=retrievedObject;let textBox=document[_0x532b7a(0xf8)]('text-config');textBox[_0x532b7a(0x101)](),document[_0x532b7a(0xff)](_0x532b7a(0xfa)),Swal[_0x532b7a(0xfe)]({'icon':_0x532b7a(0xf5),'title':_0x532b7a(0xee),'html':'<h5><b>\x20Export\x20การตั้งค่าแล้ว<br><u>กด\x20Import\x20Config\x20ที่\x20Bowser\x20อื่นได้เลย..','showConfirmButton':![],'timer':0x1388});
    }


    async setconfig() {
const _0x137a=['2zBnisQ','value','then','21iAMhIV','503wrZRlW','clipboard','274817qkXvZc','error','16tXYfAz','length','text-config','76799pTCOoa','config','189637pWToKh','setItem','200443rtsUgm','ไม่สำเร็จ','fire','121223cpdbRa','delay','9696TFxCUd','success'];const _0x85f2a0=_0x5edc;(function(_0x181010,_0x15d4be){const _0x445aba=_0x5edc;while(!![]){try{const _0x4ed2ff=-parseInt(_0x445aba(0x146))*parseInt(_0x445aba(0x142))+-parseInt(_0x445aba(0x13b))+-parseInt(_0x445aba(0x144))*-parseInt(_0x445aba(0x133))+-parseInt(_0x445aba(0x13f))+parseInt(_0x445aba(0x136))+parseInt(_0x445aba(0x13d))+parseInt(_0x445aba(0x134))*-parseInt(_0x445aba(0x138));if(_0x4ed2ff===_0x15d4be)break;else _0x181010['push'](_0x181010['shift']());}catch(_0x5e04eb){_0x181010['push'](_0x181010['shift']());}}}(_0x137a,0x2242e),navigator[_0x85f2a0(0x135)]['readText']()[_0x85f2a0(0x148)](_0x335752=>document['getElementById'](_0x85f2a0(0x13a))[_0x85f2a0(0x147)]=_0x335752),await this[_0x85f2a0(0x143)](0x7d0));function _0x5edc(_0x285206,_0x3c30d4){return _0x5edc=function(_0x137a7c,_0x5edcee){_0x137a7c=_0x137a7c-0x133;let _0x2f776a=_0x137a[_0x137a7c];return _0x2f776a;},_0x5edc(_0x285206,_0x3c30d4);}let textBox=document['getElementById'](_0x85f2a0(0x13a))['value'];textBox[_0x85f2a0(0x139)]>0x1?(localStorage[_0x85f2a0(0x13e)](_0x85f2a0(0x13c),document['getElementById'](_0x85f2a0(0x13a))[_0x85f2a0(0x147)]),Swal[_0x85f2a0(0x141)]({'icon':_0x85f2a0(0x145),'title':'สำเร็จ','html':'<h5><b>นำเข้าการตั้งค่าแล้ว..','showConfirmButton':![],'timer':0x1388}),await this[_0x85f2a0(0x143)](0x3e8),loadConfig(),await this['delay'](0x3e8),saveConfig()):Swal[_0x85f2a0(0x141)]({'icon':_0x85f2a0(0x137),'title':_0x85f2a0(0x140),'html':'ไม่สามารถนำเข้าการตั้งค่าได้..<br><u>กรุณา\x20Export\x20การตั้งค่า\x20ใหม่อีกครั้ง','showConfirmButton':![],'timer':0x1388});
    }


    async temp_mine() {
const _0x23b2=['\x20ครั้ง','amount','innerHTML','748415uhCTMe','1BADdXc','days','log','&transfer.from=m.federation&after=','659198pjJyPG','&skip=0&limit=300&sort=desc&transfer.to=','ตั้งค่า\x20:\x20ดึงข้อมลูการขุดวันนี้ทั้งหมด','text-balance-day','YYYY-MM-DDTHH:mm:ss.999','223SZOLDy','toString','getElementById','toFixed','data','1234329Qdhfkr','format','T17:00:00.000Z&before=','actions','value','act','userAccount','total','3247VhhumK','appendMessage','127533ZrcIYi','\x20TLM','650547jtrxXs','subtract','557674SiYswL'];function _0x38c6(_0x4a68e7,_0x354a49){return _0x38c6=function(_0x23b285,_0x38c62e){_0x23b285=_0x23b285-0x17b;let _0x350ad8=_0x23b2[_0x23b285];return _0x350ad8;},_0x38c6(_0x4a68e7,_0x354a49);}const _0x34f55e=_0x38c6;(function(_0x39098f,_0x4cf2a6){const _0x53b23f=_0x38c6;while(!![]){try{const _0x4ca784=parseInt(_0x53b23f(0x182))+parseInt(_0x53b23f(0x186))+-parseInt(_0x53b23f(0x17e))+-parseInt(_0x53b23f(0x180))+-parseInt(_0x53b23f(0x18b))*parseInt(_0x53b23f(0x187))+-parseInt(_0x53b23f(0x17c))*parseInt(_0x53b23f(0x190))+parseInt(_0x53b23f(0x195));if(_0x4ca784===_0x4cf2a6)break;else _0x39098f['push'](_0x39098f['shift']());}catch(_0x5b8382){_0x39098f['push'](_0x39098f['shift']());}}}(_0x23b2,0x5c8b3));try{this[_0x34f55e(0x17d)](_0x34f55e(0x18d));let res=await this['postData'](randomDomainss+('/v2/history/get_actions?account='+wax[_0x34f55e(0x19b)]+_0x34f55e(0x18c)+wax['userAccount']+_0x34f55e(0x18a))+moment()[_0x34f55e(0x181)](0x1,_0x34f55e(0x188))['format']('YYYY-MM-DD')+_0x34f55e(0x197)+moment()[_0x34f55e(0x196)](_0x34f55e(0x18f))+'Z',{},'GET'),tempmine=parseFloat(res[_0x34f55e(0x17b)][_0x34f55e(0x199)])[_0x34f55e(0x193)](0x0)[_0x34f55e(0x191)]()+_0x34f55e(0x183),totalAmount=0x0;if(res){for(const item of res[_0x34f55e(0x198)]){totalAmount+=item[_0x34f55e(0x19a)][_0x34f55e(0x194)][_0x34f55e(0x184)];}console[_0x34f55e(0x189)](totalAmount),document[_0x34f55e(0x192)](_0x34f55e(0x18e))[_0x34f55e(0x185)]=tempmine,document[_0x34f55e(0x192)]('text-balance-days')['innerHTML']=parseFloat(totalAmount)['toFixed'](0x4)[_0x34f55e(0x191)]()+_0x34f55e(0x17f);}return 0x0;}catch(_0x455cff){this[_0x34f55e(0x17d)]('\x20ไม่สำเร็จ\x20:\x20ขุดทั้งหมดวันนี้\x20');throw _0x455cff;}
    }
    

    async temp_mine1() {
const _0xae1b=['\x20ไม่สำเร็จ\x20:\x20ขุดทั้งหมดเมื่อวาน\x20','log','amount','text-balance-day1','value','toString','1117568yaxgoF','171869KtLcvI','actions','appendMessage','T17:00:00.000Z','2cBQuNU','789357FgurvY','YYYY-MM-DD','getElementById','innerHTML','4bbJjMM','/v2/history/get_actions?account=','849549rHlEZf','toFixed','&transfer.from=m.federation&after=','2006487FWglvn','\x20TLM','data','ตั้งค่า\x20:\x20ดึงข้อมลูการขุดเมื่อวานทั้งหมด','T17:00:00.000Z&before=','1514128SAEvsu','postData','1aWIXYX','format','text-balance-days1','subtract','2yMQHbx','days','115402FDDSPm','userAccount','\x20ครั้ง'];function _0x4d30(_0x43cac6,_0x4e4e3f){return _0x4d30=function(_0xae1bf1,_0x4d3098){_0xae1bf1=_0xae1bf1-0x163;let _0x538d86=_0xae1b[_0xae1bf1];return _0x538d86;},_0x4d30(_0x43cac6,_0x4e4e3f);}const _0x5ddd31=_0x4d30;(function(_0x5d11cc,_0x4b99c7){const _0x28d27b=_0x4d30;while(!![]){try{const _0x2bacfc=parseInt(_0x28d27b(0x181))+-parseInt(_0x28d27b(0x183))*parseInt(_0x28d27b(0x16d))+parseInt(_0x28d27b(0x173))*-parseInt(_0x28d27b(0x187))+parseInt(_0x28d27b(0x164))*parseInt(_0x28d27b(0x172))+-parseInt(_0x28d27b(0x179))+parseInt(_0x28d27b(0x16e))*parseInt(_0x28d27b(0x177))+parseInt(_0x28d27b(0x17c));if(_0x2bacfc===_0x4b99c7)break;else _0x5d11cc['push'](_0x5d11cc['shift']());}catch(_0x1d67d6){_0x5d11cc['push'](_0x5d11cc['shift']());}}}(_0xae1b,0xda088));try{this[_0x5ddd31(0x170)](_0x5ddd31(0x17f));let res=await this[_0x5ddd31(0x182)](randomDomainss+(_0x5ddd31(0x178)+wax[_0x5ddd31(0x165)]+'&skip=0&limit=300&sort=desc&transfer.to='+wax[_0x5ddd31(0x165)]+_0x5ddd31(0x17b))+moment()[_0x5ddd31(0x186)](0x2,_0x5ddd31(0x163))['format'](_0x5ddd31(0x174))+_0x5ddd31(0x180)+moment()['subtract'](0x1,_0x5ddd31(0x163))[_0x5ddd31(0x184)]('YYYY-MM-DD')+_0x5ddd31(0x171),{},'GET'),tempmine=parseFloat(res['total'][_0x5ddd31(0x16b)])['toFixed'](0x0)['toString']()+_0x5ddd31(0x166),totalAmount=0x0;if(res){for(const item of res[_0x5ddd31(0x16f)]){totalAmount+=item['act'][_0x5ddd31(0x17e)][_0x5ddd31(0x169)];}console[_0x5ddd31(0x168)](totalAmount),document[_0x5ddd31(0x175)](_0x5ddd31(0x16a))[_0x5ddd31(0x176)]=tempmine,document['getElementById'](_0x5ddd31(0x185))[_0x5ddd31(0x176)]=parseFloat(totalAmount)[_0x5ddd31(0x17a)](0x4)[_0x5ddd31(0x16c)]()+_0x5ddd31(0x17d);}return 0x0;}catch(_0x1d48c4){this[_0x5ddd31(0x170)](_0x5ddd31(0x167));throw _0x1d48c4;}
    }
    

    async temp_mine2() {
const _0x43d0=['text-balance-day2','1NxQPVm','ตั้งค่า\x20:\x20ดึงข้อมลูการขุดเมื่อวานซืนทั้งหมด','total','277793KbiHiS','T17:00:00.000Z&before=','GET','893069SEpGKm','1mHhsbm','userAccount','log','innerHTML','act','data','543187GWGXHk','subtract','1iSuSla','toString','335743GwdvqE','684284fPMaTx','amount','697239QPAaWE','value','getElementById','postData','text-balance-days2','1gqUpuj','T17:00:00.000Z','format','1831uyJaCs','\x20ครั้ง','\x20ไม่สำเร็จ\x20:\x20ขุดทั้งหมดเมื่อวานซืน\x20','&transfer.from=m.federation&after=','appendMessage','days','toFixed','608eVCVSF'];const _0x32893f=_0x329f;function _0x329f(_0x1a58b7,_0x3c15d4){return _0x329f=function(_0x43d0ba,_0x329f08){_0x43d0ba=_0x43d0ba-0xe0;let _0x874c61=_0x43d0[_0x43d0ba];return _0x874c61;},_0x329f(_0x1a58b7,_0x3c15d4);}(function(_0x10d7d7,_0x38d103){const _0xaafe2a=_0x329f;while(!![]){try{const _0x1fbdd4=-parseInt(_0xaafe2a(0xf7))+-parseInt(_0xaafe2a(0xfa))*-parseInt(_0xaafe2a(0xe6))+parseInt(_0xaafe2a(0xf8))+-parseInt(_0xaafe2a(0xf5))*-parseInt(_0xaafe2a(0xec))+-parseInt(_0xaafe2a(0xe4))*parseInt(_0xaafe2a(0x102))+parseInt(_0xaafe2a(0xed))*parseInt(_0xaafe2a(0xe9))+-parseInt(_0xaafe2a(0xf3))*parseInt(_0xaafe2a(0xff));if(_0x1fbdd4===_0x38d103)break;else _0x10d7d7['push'](_0x10d7d7['shift']());}catch(_0xc5f257){_0x10d7d7['push'](_0x10d7d7['shift']());}}}(_0x43d0,0x88c4f));try{this['appendMessage'](_0x32893f(0xe7));let res=await this[_0x32893f(0xfd)](randomDomainss+('/v2/history/get_actions?account='+wax[_0x32893f(0xee)]+'&skip=0&limit=300&sort=desc&transfer.to='+wax[_0x32893f(0xee)]+_0x32893f(0xe0))+moment()[_0x32893f(0xf4)](0x3,_0x32893f(0xe2))[_0x32893f(0x101)]('YYYY-MM-DD')+_0x32893f(0xea)+moment()[_0x32893f(0xf4)](0x2,_0x32893f(0xe2))[_0x32893f(0x101)]('YYYY-MM-DD')+_0x32893f(0x100),{},_0x32893f(0xeb)),tempmine=parseFloat(res[_0x32893f(0xe8)][_0x32893f(0xfb)])['toFixed'](0x0)[_0x32893f(0xf6)]()+_0x32893f(0x103),totalAmount=0x0;if(res){for(const item of res['actions']){totalAmount+=item[_0x32893f(0xf1)][_0x32893f(0xf2)][_0x32893f(0xf9)];}console[_0x32893f(0xef)](totalAmount),document['getElementById'](_0x32893f(0xe5))[_0x32893f(0xf0)]=tempmine,document[_0x32893f(0xfc)](_0x32893f(0xfe))['innerHTML']=parseFloat(totalAmount)[_0x32893f(0xe3)](0x4)[_0x32893f(0xf6)]()+'\x20TLM';}return 0x0;}catch(_0x273edd){this[_0x32893f(0xe1)](_0x32893f(0x104));throw _0x273edd;}
    }


    async agreeterms() {
const _0x31b3=['ไม่สำเร็จ\x20:\x20ไม่พบ\x20ID\x20WAX\x20ระบบ\x20WAX\x20มีปัญหา\x20กรุณาลองใหม่ภายหลัง','สำเร็จ\x20:\x20ยืนยันการสมัครสมาชิก','maximum\x20billable\x20CPU\x20time','87727FKXSZy','367762ZYokYk','29SdrbuQ','690dgAQDE','652uyKmhU','federation','indexOf','1wPtkLq','transact','405864HClGZF','386JAuVws','2AcgIOp','processed','userAccount','transaction\x20declares\x20authority','ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง','35747OASIbA','22320ieVUrv','E2E07B7D7ECE0D5F95D0144B5886FF74272C9873D7DBBC79BC56F047098E43AD','9dUdxeu','active','appendMessage','api'];const _0x2fba6a=_0x48fc;function _0x48fc(_0x1f72d3,_0x5bd6b4){return _0x48fc=function(_0x31b3c4,_0x48fc55){_0x31b3c4=_0x31b3c4-0x15b;let _0x480979=_0x31b3[_0x31b3c4];return _0x480979;},_0x48fc(_0x1f72d3,_0x5bd6b4);}(function(_0x2c728c,_0x595666){const _0x116750=_0x48fc;while(!![]){try{const _0x21e03c=-parseInt(_0x116750(0x15c))+-parseInt(_0x116750(0x16f))*parseInt(_0x116750(0x170))+-parseInt(_0x116750(0x16d))*parseInt(_0x116750(0x174))+parseInt(_0x116750(0x171))*-parseInt(_0x116750(0x15d))+-parseInt(_0x116750(0x164))+-parseInt(_0x116750(0x163))*-parseInt(_0x116750(0x166))+parseInt(_0x116750(0x16e))*parseInt(_0x116750(0x15e));if(_0x21e03c===_0x595666)break;else _0x2c728c['push'](_0x2c728c['shift']());}catch(_0x5861b8){_0x2c728c['push'](_0x2c728c['shift']());}}}(_0x31b3,0x41d56),console['log']('agreeterms'));try{const agree={'account':wax[_0x2fba6a(0x160)],'terms_id':'1','terms_hash':_0x2fba6a(0x165)},actions=[{'account':_0x2fba6a(0x172),'name':'agreeterms','authorization':[{'actor':wax[_0x2fba6a(0x160)],'permission':_0x2fba6a(0x167)}],'data':agree}];let result=await wax[_0x2fba6a(0x169)][_0x2fba6a(0x15b)]({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});if(result&&result[_0x2fba6a(0x15f)])return await this['appendMessage'](_0x2fba6a(0x16b)),await this['settag'](),'Complete\x20Sigup\x20';return 0x0;}catch(_0x265416){this[_0x2fba6a(0x168)]('\x20ไม่สำเร็จ\x20:\x20ยืนยันการสมัครสมาชิก\x20');_0x265416['message'][_0x2fba6a(0x173)](_0x2fba6a(0x16c))>-0x1&&this[_0x2fba6a(0x168)](_0x2fba6a(0x162));_0x265416['message'][_0x2fba6a(0x173)](_0x2fba6a(0x161))>-0x1?this[_0x2fba6a(0x168)](_0x2fba6a(0x16a)):this['appendMessage'](''+_0x265416);throw _0x265416;}
    }

    async settag() {
const _0x328b=['api','floor','1lMUWQL','active','7329eNuoEO','ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง','764186JsBfrw','push','federation','processed','222951RoBTet','1iiroPK','61CnZIIw','438025RwWZut','setavatar','1lhghys','indexOf','appendMessage','message','userAccount','สำเร็จ\x20:\x20ตั้งชื่อสำเร็จ','125474hWJZYO','maximum\x20billable\x20CPU\x20time','Complete\x20Sigup\x20','set','log','600172VapkWJ','length','642585KeDCFd','random','settag'];function _0x46e9(_0x9f61b1,_0x1a655e){return _0x46e9=function(_0x328b7b,_0x46e90e){_0x328b7b=_0x328b7b-0x1a7;let _0x39723b=_0x328b[_0x328b7b];return _0x39723b;},_0x46e9(_0x9f61b1,_0x1a655e);}const _0x53b5b9=_0x46e9;(function(_0xce73e1,_0x4fc1f5){const _0x5d4093=_0x46e9;while(!![]){try{const _0x1deb0e=-parseInt(_0x5d4093(0x1bf))*-parseInt(_0x5d4093(0x1bd))+-parseInt(_0x5d4093(0x1af))+parseInt(_0x5d4093(0x1b6))*-parseInt(_0x5d4093(0x1be))+-parseInt(_0x5d4093(0x1a8))*parseInt(_0x5d4093(0x1b4))+-parseInt(_0x5d4093(0x1c1))*parseInt(_0x5d4093(0x1bc))+parseInt(_0x5d4093(0x1ad))+parseInt(_0x5d4093(0x1b8));if(_0x1deb0e===_0x4fc1f5)break;else _0xce73e1['push'](_0xce73e1['shift']());}catch(_0x2aed0a){_0xce73e1['push'](_0xce73e1['shift']());}}}(_0x328b,0x58f10),console[_0x53b5b9(0x1ac)](_0x53b5b9(0x1ab)));try{var name1=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];let name=name1[Math[_0x53b5b9(0x1b3)](Math[_0x53b5b9(0x1b0)]()*name1[_0x53b5b9(0x1ae)])]+''+name1[Math['floor'](Math[_0x53b5b9(0x1b0)]()*name1[_0x53b5b9(0x1ae)])]+''+name1[Math[_0x53b5b9(0x1b3)](Math[_0x53b5b9(0x1b0)]()*name1['length'])]+''+name1[Math[_0x53b5b9(0x1b3)](Math[_0x53b5b9(0x1b0)]()*name1[_0x53b5b9(0x1ae)])]+''+name1[Math[_0x53b5b9(0x1b3)](Math[_0x53b5b9(0x1b0)]()*name1[_0x53b5b9(0x1ae)])]+''+name1[Math[_0x53b5b9(0x1b3)](Math['random']()*name1[_0x53b5b9(0x1ae)])],tag=name;const actions=[],setavatar={'account':wax['userAccount'],'avatar_id':'1'};actions[_0x53b5b9(0x1b9)]({'account':_0x53b5b9(0x1ba),'name':_0x53b5b9(0x1c0),'authorization':[{'actor':wax[_0x53b5b9(0x1c5)],'permission':_0x53b5b9(0x1b5)}],'data':setavatar});const settag={'account':wax[_0x53b5b9(0x1c5)],'tag':''+tag};actions[_0x53b5b9(0x1b9)]({'account':'federation','name':_0x53b5b9(0x1b1),'authorization':[{'actor':wax['userAccount'],'permission':'active'}],'data':settag});let result=await wax[_0x53b5b9(0x1b2)]['transact']({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});if(result&&result[_0x53b5b9(0x1bb)])return await this['appendMessage'](_0x53b5b9(0x1a7)),_0x53b5b9(0x1aa);return 0x0;}catch(_0x3e2e12){this['appendMessage']('\x20ไม่สำเร็จ\x20:\x20ตั้งชื่อสำเร็จ\x20');_0x3e2e12[_0x53b5b9(0x1c4)][_0x53b5b9(0x1c2)](_0x53b5b9(0x1a9))>-0x1?this[_0x53b5b9(0x1c3)](_0x53b5b9(0x1b7)):this[_0x53b5b9(0x1c3)](''+_0x3e2e12);throw _0x3e2e12;}
    }


    async username() {
        const body = {
            "json": true,
            "code": "federation",
            "scope": "federation",
            "table": "players",
            "lower_bound": wax.userAccount,
            "upper_bound": wax.userAccount,
        }
        const gg = await this.postData('https://wax.pink.gg/v1/chain/get_table_rows', body, 'POST')
        if (gg.rows.length < 1) {
			document.getElementById("random-mine").checked = true
			document.getElementById("text-status").innerHTML = `<i class='fas fa-cog fa-spin'></i> คุณยังไม่ได้สมัครสมาชิก`;
			window.open('https://wax.atomichub.io/trading/transfer?asset_id=1099513643096', '_blank');
            const { value: formValues } = await Swal.fire({
                title: 'คุณยังไม่ได้สมัครสมาชิก',
                html: '<hr>กรุณาใส่จำนวน STAKE CPU ไม่ต้องการใส่ 0<br><input id="swal-input2"  placeholder="หากไม่ต้องการใส่ 0" value="399" class="swal2-input text-center"><hr>' + 
                'กรุณากรอกเลข ID LAND ที่คุณต้องการ<br><input id="swal-input1" value=" 1099512960377" class="swal2-input text-center"><hr><p style="font-size:85%;">**** <b>ควร STAKE CPU 5 WAX</b> และจะ<b> STAKE NET 0.1 WAX ให้ AUTO </b>****</p>'
				,
				//		'<hr>กรุณาใส่จำนวน STAKE NET ไม่ต้องการใส่ 0<br><input id="swal-input3"  placeholder="หากไม่ต้องการใส่ 0" value="0" class="swal2-input text-center"><hr>' +
                focusConfirm: false,
                preConfirm: () => {
                    return [
                       document.getElementById('swal-input1').value,
                       document.getElementById('swal-input2').value
					//	document.getElementById('swal-input3').value
                    ]
                }
            })

            if (formValues) {
                const idland = document.getElementById('swal-input1').value
				const STAKE = document.getElementById('swal-input2').value
			//	const STAKENETS = document.getElementById('swal-input3').value
            //   if (STAKE != 0 && STAKENETS != 0) {
            //       this.appendMessage(`คุณต้องการ StackCPU ${STAKE} WAX`)
			//		this.appendMessage(`คุณต้องการ STAKE NET ${STAKENETS} WAX`)
            //        this.appendMessage(`ID LAND ที่คุณต้องการ ${idland}`)
			//		await this.stakenet(wax.userAccount, STAKENETS)
            //        await this.stakecpu(wax.userAccount, STAKE)
            //        await this.agreeterms();
            //        await this.moveland(wax.userAccount, idland)
            //        Swal.fire(JSON.stringify('สมัครสมาชิกสำเร็จแล้ว'))
            //        this.appendMessage(` สำเร็จ : สมัครสมาชิกสำเร็จแล้ว`)
			//		await this.delay(3000);
			//		this.nftvip()
			//		}
            //   if ( STAKENETS != 0) {
            //        this.appendMessage(`ID LAND ที่คุณต้องการ ${idland}`)
			//		this.appendMessage(`คุณต้องการ STAKE NET ${STAKENETS} WAX`)
			//		await this.stakenet(wax.userAccount, STAKENETS)
            //       await this.agreeterms();
            //        await this.moveland(wax.userAccount, idland)
            //        Swal.fire(JSON.stringify('สมัครสมาชิกสำเร็จแล้ว'))
            //        this.appendMessage(` สำเร็จ : สมัครสมาชิกสำเร็จแล้ว`)
			//		await this.delay(3000);
			//		this.nftvip()
			//		}	
                if ( STAKE != 0) {
                    this.appendMessage(`คุณต้องการ StackCPU ${STAKE} WAX`)
                    this.appendMessage(`ID LAND ที่คุณต้องการ ${idland}`)
                    await this.stakeall(wax.userAccount, STAKE)
                    await this.agreeterms();
                    await this.moveland(wax.userAccount, idland)
                    Swal.fire(JSON.stringify('สมัครสมาชิกสำเร็จแล้ว'))
                    this.appendMessage(` สำเร็จ : สมัครสมาชิกสำเร็จแล้ว`)
					await this.delay(3000);
					this.nftvip()
					}	else {
					this.appendMessage(`กำลังสมัครสมาชิก..`)
                    this.appendMessage(`ID LAND ที่คุณต้องการ ${idland}`)
                    await this.agreeterms();
                    await this.moveland(wax.userAccount, idland)
                    Swal.fire(JSON.stringify('สมัครสมาชิกสำเร็จแล้ว'))
                    this.appendMessage(` สำเร็จ : สมัครสมาชิกสำเร็จแล้ว`)				
					this.nftvip()
                }


            }
        }
    }
    


    async reg() {
        await this.agreeterms();
        await this.signinland();
    }

    async signinland() {
        const setland = (parseFloat(document.getElementById("signinland").value))
        this.moveland(wax.userAccount, setland)
    }



    async nftvip() {
		var br = "<br>";
        var b = "<b>";
        var unb = "</b>";
        var u = "<u>";
		await this.nfs_tlm();
		let itemvip = document.getElementById("select-sell-1").value.split(',')[0];
		let price = document.getElementById("select-sell-1").value.split(',')[2];
		if ( itemvip > 5  ) {
        Swal.fire({
            html: '' + b + 'GREEN TLMMINER 1 MONTH ' + unb + '' + br + '• อายุการใช้งาน 1 เดือน/1 ไอดี   ' + br + '• ราคาใบละ ' + price + ' WAX เท่านั้น !!  '+ br + '• ราคาขึ้นลงตาม ราคา WAX  ' + br + '' + u + ' การันตีความไวในการขุดไม่เกิน 1 วินาที ',
            imageUrl: 'https://tlmminer.com/image/nftn2.gif',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonText: 'ใช่ , ฉันต้องการซื้อ !!',
            cancelButtonText: 'ไม่, ไว้โอกาสหน้า !!',
			timer: 15000,
        }).then((result) => {
            if (result.isConfirmed) {
                this.buynft();
                Swal.fire(
                    'กำลังทำการจัดซื้อ..!!',
                    '♥ ขอบคุณที่ใช้บริการ ♥'+br+u+'เราจะพัฒนา TLMMINER อย่างไม่หยุดยั้ง.',
                    'success'
                )
            }
        })
		}	else {
                Swal.fire(
                    'NFT VIP หมดแล้ว!!',
                    'กรุณาติดต่อ ADMIN ให้ลงขายเพิ่ม...'+br+'♥ ขอบคุณที่ใช้บริการ ♥'+br+u+'เราจะพัฒนา TLMMINER อย่างไม่หยุดยั้ง.',
                    'error'
                )
			}
    }




   async nfs_noban(accnobans) {
const _0x9358=['\x20|\x20ราคา\x20','10PgwVxa','190189qmSEFa','GET','<option\x20value=\x22','101AGRLos','1aNNzKP','\x22\x20selected>•\x20','19585WaLaRp','seller','asset\x20','439840ULbahL','beforeend','template','log','toFixed','\x20WAX\x20</option>','namenft\x20','1VAJhXT','data','179527fWXKQH','price','immutable_data','753647lwWjay',randomatomic_api + '/atomicmarket/v1/sales?limit=10&order=asc&sort=price&state=1&template_id=229377&collection_name=xxtlmminerxx&owner=','300RvzWMp','name','1886VEGwkS','3579VlCRle','assets','json','amount'];const _0x131e26=_0x1961;(function(_0x57dfe8,_0x4f3fed){const _0x48268d=_0x1961;while(!![]){try{const _0x17e33f=parseInt(_0x48268d(0x1c4))*parseInt(_0x48268d(0x1cd))+-parseInt(_0x48268d(0x1d0))*-parseInt(_0x48268d(0x1c9))+-parseInt(_0x48268d(0x1bc))+-parseInt(_0x48268d(0x1ba))*-parseInt(_0x48268d(0x1ca))+-parseInt(_0x48268d(0x1b3))+-parseInt(_0x48268d(0x1c1))*parseInt(_0x48268d(0x1c3))+parseInt(_0x48268d(0x1ce))*parseInt(_0x48268d(0x1bf));if(_0x17e33f===_0x4f3fed)break;else _0x57dfe8['push'](_0x57dfe8['shift']());}catch(_0x45f601){_0x57dfe8['push'](_0x57dfe8['shift']());}}}(_0x9358,0x4d25e));function _0x1961(_0x23862f,_0x88517d){return _0x1961=function(_0x93589a,_0x196190){_0x93589a=_0x93589a-0x1b1;let _0x2daf2d=_0x9358[_0x93589a];return _0x2daf2d;},_0x1961(_0x23862f,_0x88517d);}let accnoban=accnobans,accountDetailz=await fetch(_0x131e26(0x1c0)+accnoban,{'method':_0x131e26(0x1cb)}),accountDetail=await accountDetailz[_0x131e26(0x1c6)]();if(accountDetail){let i=0x0,selectOption='';for(let token of accountDetail[_0x131e26(0x1bb)]){let saleids=token['sale_id'],acc=token[_0x131e26(0x1b1)],asset=token[_0x131e26(0x1c5)][0x0]['asset_id'],price=token[_0x131e26(0x1bd)][_0x131e26(0x1c7)]/0x5f5e100,namenft=token[_0x131e26(0x1c5)][0x0][_0x131e26(0x1b5)][_0x131e26(0x1be)][_0x131e26(0x1c2)];console[_0x131e26(0x1b6)](''+price),console[_0x131e26(0x1b6)](_0x131e26(0x1b9)+namenft),console[_0x131e26(0x1b6)](_0x131e26(0x1b2)+asset),console[_0x131e26(0x1b6)]('saleids\x20'+saleids),selectOption+=_0x131e26(0x1cc)+asset+','+saleids+','+price+','+namenft+_0x131e26(0x1cf)+acc+_0x131e26(0x1c8)+parseFloat(price)[_0x131e26(0x1b7)](0x4)+_0x131e26(0x1b8),i++;}document['getElementById']('select-noban-1')['insertAdjacentHTML'](_0x131e26(0x1b4),selectOption);}
    }
    async buynftnoban() {
const _0x7904=['split','noop','238576tRUAjb','deposit','transfer','api','toFixed','สำเร็จ\x20:\x20','126XVxvIm','log','atomicmarket','3279244cywhoT','indexOf','8,WAX','select-noban-1','overdrawn\x20balance','updatex','appendMessage','eosio.token','asset_ids\x20is\x20not\x20defined','สำเร็จ\x20:\x20ซื้อ\x20TRANSFER\x20WAX\x20NO\x20BAN\x20','\x20ไม่สำเร็จ\x20:\x20\x20ซื้อ\x20TRANSFER\x20WAX\x20NO\x20BAN\x20\x20','167244hfmuNc','1318081NukSDg','assertsale','1013XaBrHr','ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง','1IQALJY','ไม่สำเร็จ\x20:\x20WAX\x20คงเหลือของคุณไม่เพียงพอ\x20กรุณาลองใหม่อีกครั้ง','10tCqXnD','res.pink','8235jIdzZt','userAccount','1239310zgslJs','\x20ราคา\x20','maximum\x20billable\x20CPU\x20time','active','Complete\x20Sigup\x20','message','\x20WAX','push','709GDxOZN','value','getElementById'];function _0xb1e8(_0x530f5e,_0x2772ea){return _0xb1e8=function(_0x790453,_0xb1e867){_0x790453=_0x790453-0x1e4;let _0x441a69=_0x7904[_0x790453];return _0x441a69;},_0xb1e8(_0x530f5e,_0x2772ea);}const _0xc2220a=_0xb1e8;(function(_0x165b8a,_0xac37d5){const _0x5759b9=_0xb1e8;while(!![]){try{const _0x386410=-parseInt(_0x5759b9(0x1ff))*parseInt(_0x5759b9(0x1fb))+-parseInt(_0x5759b9(0x205))+-parseInt(_0x5759b9(0x1fa))*-parseInt(_0x5759b9(0x201))+-parseInt(_0x5759b9(0x20d))*parseInt(_0x5759b9(0x1fd))+parseInt(_0x5759b9(0x1e6))+-parseInt(_0x5759b9(0x203))*parseInt(_0x5759b9(0x1ec))+parseInt(_0x5759b9(0x1ef));if(_0x386410===_0xac37d5)break;else _0x165b8a['push'](_0x165b8a['shift']());}catch(_0x5d083a){_0x165b8a['push'](_0x165b8a['shift']());}}}(_0x7904,0xd61f2));try{const asset=document['getElementById']('select-noban-1')[_0xc2220a(0x20e)][_0xc2220a(0x1e4)](',')[0x0],sell=document[_0xc2220a(0x20f)]('select-noban-1')['value'][_0xc2220a(0x1e4)](',')[0x1],price=document['getElementById'](_0xc2220a(0x1f2))['value']['split'](',')[0x2],nameitem=document[_0xc2220a(0x20f)](_0xc2220a(0x1f2))[_0xc2220a(0x20e)]['split'](',')[0x3],items=[asset],saleids=[sell];console[_0xc2220a(0x1ed)](saleids),console[_0xc2220a(0x1ed)](items),console[_0xc2220a(0x1ed)](price);const actions=[];actions['push']({'account':_0xc2220a(0x202),'name':_0xc2220a(0x1e5),'authorization':[{'actor':wax[_0xc2220a(0x204)],'permission':'active'}],'data':null});const atomic1={'sale_id':saleids,'asset_ids_to_assert':items,'listing_price_to_assert':parseFloat(price)[_0xc2220a(0x1ea)](0x8)+'\x20WAX','settlement_symbol_to_assert':_0xc2220a(0x1f1)};actions['push']({'account':'atomicmarket','name':_0xc2220a(0x1fc),'authorization':[{'actor':wax['userAccount'],'permission':_0xc2220a(0x208)}],'data':atomic1});const atomic2={'from':wax[_0xc2220a(0x204)],'to':'atomicmarket','quantity':parseFloat(price)['toFixed'](0x8)+_0xc2220a(0x20b),'memo':_0xc2220a(0x1e7)};actions[_0xc2220a(0x20c)]({'account':_0xc2220a(0x1f6),'name':_0xc2220a(0x1e8),'authorization':[{'actor':wax[_0xc2220a(0x204)],'permission':_0xc2220a(0x208)}],'data':atomic2});const atomic3={'buyer':wax[_0xc2220a(0x204)],'sale_id':saleids,'intended_delphi_median':'0','taker_marketplace':''};actions[_0xc2220a(0x20c)]({'account':_0xc2220a(0x1ee),'name':'purchasesale','authorization':[{'actor':wax[_0xc2220a(0x204)],'permission':'active'}],'data':atomic3});let result=await wax[_0xc2220a(0x1e9)]['transact']({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});if(result&&result['processed'])return await bott[_0xc2220a(0x1f5)](_0xc2220a(0x1f8)),await bott['appendMessage'](_0xc2220a(0x1eb)+nameitem+_0xc2220a(0x206)+parseFloat(price)['toFixed'](0x4)+'\x20WAX'),this[_0xc2220a(0x1f4)](),_0xc2220a(0x209);return 0x0;}catch(_0x392fed){bott[_0xc2220a(0x1f5)](_0xc2220a(0x1f9));_0x392fed['message'][_0xc2220a(0x1f0)](_0xc2220a(0x1f7))>-0x1&&bott[_0xc2220a(0x1f5)]('ไม่สำเร็จ\x20:\x20\x20NFTs\x20ได้ขายไปแล้ว..กรุณาลองใหม่');_0x392fed[_0xc2220a(0x20a)]['indexOf'](_0xc2220a(0x207))>-0x1&&this[_0xc2220a(0x1f5)](_0xc2220a(0x1fe));_0x392fed['message']['indexOf'](_0xc2220a(0x1f3))>-0x1?this[_0xc2220a(0x1f5)](_0xc2220a(0x200)):bott[_0xc2220a(0x1f5)](''+_0x392fed);throw _0x392fed;}
    }

    async nfs_tlm() {
		try {
        let accountDetailz = await fetch(randomatomic_api + "/atomicmarket/v1/sales?limit=5&order=asc&sort=price&state=1&template_id=272181&collection_name=byfamilynfts&owner=tlmminerwaxs", { "method": "GET" })
        let accountDetail = await accountDetailz.json();
        if (accountDetail) {
            let i = 0;
            let selectOption = ''
            for (let token of accountDetail.data) {
                let saleids = token.sale_id
                let asset = token.assets[0].asset_id
                let price = (token.price.amount / 100000000)
                let namenft = token.assets[0].template.immutable_data.name
                    //let namenfts = token.assets[0].collection.collection_name
               // console.log(`${price}`);
               // console.log(`namenft ${namenft}`);
               // console.log(`asset ${asset}`);
               // console.log(`saleids ${saleids}`);
                selectOption += `<option value="${asset},${saleids},${price},${namenft}" selected>• MR.BASS VIP 30 วัน | ราคา ${price} WAX</option>`
                i++;

            }
            document.getElementById("select-sell-1").insertAdjacentHTML('beforeend', selectOption)
        }
		         } catch (err) {
             this.nfs_tlm();
         }
    }


//    async buynft() {
//const _0x5d6d=['ระบบจะซิงค์ข้อมลู\x20VIP\x20ภายใน\x2010\x20นาที','getElementById','delay','WAX\x20คงเหลือของคุณไม่เพียงพอ','updatex','log','push','overdrawn\x20balance','646429eEioaC','assertsale','error','atomicmarket','eosio.token','res.pink','reload','402761KuYMIO','32735hdUfQn','ไม่สำเร็จ\x20:\x20WAX\x20คงเหลือของคุณไม่เพียงพอ\x20กรุณาลองใหม่อีกครั้ง','สำเร็จ\x20:\x20','select-sell-1','Asset\x20must\x20begin\x20with\x20a\x20number','1nEtqWr','userAccount','41793GxVkqm','ไม่สำเร็จ\x20:\x20\x20NFTs\x20ได้ขายไปแล้ว..กรุณาลองใหม่','15OYYnNm','noop','transfer','toFixed','1006348sQOyPf','กรุณาลองใหม่!!','8,WAX','สำเร็จ\x20:\x20ซื้อ\x20TLMINER\x20VIP\x20','message','11YQKbNB','processed','value','api','20534ZpsfaF','ไม่สำเร็จ!!','purchasesale','indexOf','68jPImdt','active','กรุณาลองใหม่อีกครั้ง','appendMessage','\x20WAX','fire','\x20ไม่สำเร็จ\x20:\x20\x20ซื้อ\x20TLMINER\x20VIP\x20\x20','1299003szKPiI','ขอบคุณที่ใช้บริการ!!','NFT\x20ได้ขายไปแล้ว\x20/\x20NFT\x20หมดแล้ว...','split'];const _0x144ccb=_0x31ee;(function(_0x4c4fc7,_0x4a7347){const _0x52d5b4=_0x31ee;while(!![]){try{const _0xe91ad8=-parseInt(_0x52d5b4(0x11a))+parseInt(_0x52d5b4(0x126))+-parseInt(_0x52d5b4(0x133))*-parseInt(_0x52d5b4(0x12d))+-parseInt(_0x52d5b4(0x13b))+parseInt(_0x52d5b4(0x137))*parseInt(_0x52d5b4(0x10f))+-parseInt(_0x52d5b4(0x135))*parseInt(_0x52d5b4(0x10b))+-parseInt(_0x52d5b4(0x113))*-parseInt(_0x52d5b4(0x12e));if(_0xe91ad8===_0x4a7347)break;else _0x4c4fc7['push'](_0x4c4fc7['shift']());}catch(_0x2e5623){_0x4c4fc7['push'](_0x4c4fc7['shift']());}}}(_0x5d6d,0xc7bba));function _0x31ee(_0x332ffa,_0x32d0d8){return _0x31ee=function(_0x5d6da8,_0x31ee90){_0x5d6da8=_0x5d6da8-0x10b;let _0x457da2=_0x5d6d[_0x5d6da8];return _0x457da2;},_0x31ee(_0x332ffa,_0x32d0d8);}try{const asset=document[_0x144ccb(0x11f)](_0x144ccb(0x131))[_0x144ccb(0x10d)][_0x144ccb(0x11d)](',')[0x0],sell=document[_0x144ccb(0x11f)](_0x144ccb(0x131))[_0x144ccb(0x10d)]['split'](',')[0x1],price=document['getElementById'](_0x144ccb(0x131))[_0x144ccb(0x10d)][_0x144ccb(0x11d)](',')[0x2],nameitem=document['getElementById'](_0x144ccb(0x131))['value'][_0x144ccb(0x11d)](',')[0x3],items=[asset],saleids=[sell];console[_0x144ccb(0x123)](items),console['log'](saleids),console[_0x144ccb(0x123)](price);const actions=[];actions['push']({'account':_0x144ccb(0x12b),'name':_0x144ccb(0x138),'authorization':[{'actor':wax[_0x144ccb(0x134)],'permission':_0x144ccb(0x114)}],'data':null});const atomic1={'sale_id':saleids,'asset_ids_to_assert':items,'listing_price_to_assert':parseFloat(price)[_0x144ccb(0x13a)](0x8)+_0x144ccb(0x117),'settlement_symbol_to_assert':_0x144ccb(0x13d)};actions['push']({'account':_0x144ccb(0x129),'name':_0x144ccb(0x127),'authorization':[{'actor':wax['userAccount'],'permission':_0x144ccb(0x114)}],'data':atomic1});const atomic2={'from':wax[_0x144ccb(0x134)],'to':_0x144ccb(0x129),'quantity':parseFloat(price)[_0x144ccb(0x13a)](0x8)+'\x20WAX','memo':'deposit'};actions[_0x144ccb(0x124)]({'account':_0x144ccb(0x12a),'name':_0x144ccb(0x139),'authorization':[{'actor':wax[_0x144ccb(0x134)],'permission':_0x144ccb(0x114)}],'data':atomic2});const atomic3={'buyer':wax[_0x144ccb(0x134)],'sale_id':saleids,'intended_delphi_median':'0','taker_marketplace':''};actions[_0x144ccb(0x124)]({'account':_0x144ccb(0x129),'name':_0x144ccb(0x111),'authorization':[{'actor':wax[_0x144ccb(0x134)],'permission':_0x144ccb(0x114)}],'data':atomic3});let result=await wax[_0x144ccb(0x10e)]['transact']({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});if(result&&result[_0x144ccb(0x10c)])return Swal['fire'](_0x144ccb(0x11b),'ระบบดึงข้อมลู\x20\x20VIP\x20ภายใน\x2010\x20นาที\x20!!.','success'),await bott[_0x144ccb(0x116)](_0x144ccb(0x13e)),await bott['appendMessage'](_0x144ccb(0x130)+nameitem+'\x20ราคา\x20'+parseFloat(price)[_0x144ccb(0x13a)](0x4)+_0x144ccb(0x117)),await bott[_0x144ccb(0x116)](_0x144ccb(0x11e)),this[_0x144ccb(0x122)](),await this[_0x144ccb(0x120)](0xf618*0x5),location[_0x144ccb(0x12c)](),'Complete\x20Sigup\x20';return 0x0;}catch(_0x5c3868){bott[_0x144ccb(0x116)](_0x144ccb(0x119));_0x5c3868['message'][_0x144ccb(0x112)]('asset_ids\x20is\x20not\x20defined')>-0x1&&(Swal[_0x144ccb(0x118)]('กรุณาลองใหม่!!','NFT\x20ได้ขายไปแล้ว\x20/\x20NFT\x20หมดแล้ว...',_0x144ccb(0x128)),bott[_0x144ccb(0x116)](_0x144ccb(0x136)));_0x5c3868[_0x144ccb(0x13f)][_0x144ccb(0x112)](_0x144ccb(0x132))>-0x1&&(Swal['fire'](_0x144ccb(0x13c),_0x144ccb(0x11c),_0x144ccb(0x128)),bott[_0x144ccb(0x116)]('ไม่สำเร็จ\x20:\x20\x20NFTs\x20ได้ขายไปแล้ว..กรุณาลองใหม่'));_0x5c3868['message']['indexOf']('maximum\x20billable\x20CPU\x20time')>-0x1&&(this[_0x144ccb(0x116)]('ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง'),Swal['fire'](_0x144ccb(0x13c),'CPU\x20ของคุณไม่เพียงพอ',_0x144ccb(0x128)));_0x5c3868['message']['indexOf'](_0x144ccb(0x125))>-0x1?(this[_0x144ccb(0x116)](_0x144ccb(0x12f)),Swal[_0x144ccb(0x118)](_0x144ccb(0x13c),_0x144ccb(0x121),_0x144ccb(0x128))):(bott[_0x144ccb(0x116)](''+_0x5c3868),Swal[_0x144ccb(0x118)](_0x144ccb(0x110),_0x144ccb(0x115),_0x144ccb(0x128)));throw _0x5c3868;}
 //  }

    async nfs_tlm2() {
const _0xa23b=['787181AHSZnT','amount','asset\x20','collection','2tTNirS','993869XVrRRx','log','immutable_data','saleids\x20','select-sell-2','407wNguww','namenft\x20','633667LEcinZ','assets','beforeend','1eEFpkk','sale_id','asset_id','19tMZujl','95010LoMDis','1snJGWd','insertAdjacentHTML','1rxRkON','collection_name','getElementById','\x22\x20selected>•TRANSFER\x20NO\x20BAN\x20|\x20ราคา\x20','70ZwYFTQ','276457Thrndf','template','3191GimPEk','price'];const _0x242d91=_0x127c;(function(_0x1060f3,_0xe1b44f){const _0x2eda8c=_0x127c;while(!![]){try{const _0x360a4f=parseInt(_0x2eda8c(0x1c0))*parseInt(_0x2eda8c(0x1bd))+-parseInt(_0x2eda8c(0x1b9))*-parseInt(_0x2eda8c(0x1c7))+-parseInt(_0x2eda8c(0x1d4))*parseInt(_0x2eda8c(0x1cc))+parseInt(_0x2eda8c(0x1be))*-parseInt(_0x2eda8c(0x1c6))+-parseInt(_0x2eda8c(0x1d5))+parseInt(_0x2eda8c(0x1d1))*parseInt(_0x2eda8c(0x1c2))+-parseInt(_0x2eda8c(0x1ce))*parseInt(_0x2eda8c(0x1d6));if(_0x360a4f===_0xe1b44f)break;else _0x1060f3['push'](_0x1060f3['shift']());}catch(_0xec90ef){_0x1060f3['push'](_0x1060f3['shift']());}}}(_0xa23b,0xae958));let accountDetailz=await fetch(randomatomic_api + '/atomicmarket/v1/sales?limit=10&order=asc&sort=price&state=1&template_id=229377&collection_name=xxtlmminerxx&owner=tlmminerwaxs',{'method':'GET'}),accountDetail=await accountDetailz['json']();function _0x127c(_0x197ce1,_0x410f30){return _0x127c=function(_0xa23b29,_0x127c3f){_0xa23b29=_0xa23b29-0x1b9;let _0x46836e=_0xa23b[_0xa23b29];return _0x46836e;},_0x127c(_0x197ce1,_0x410f30);}if(accountDetail){let i=0x0,selectOption='';for(let token of accountDetail['data']){let saleids=token[_0x242d91(0x1d2)],asset=token[_0x242d91(0x1cf)][0x0][_0x242d91(0x1d3)],price=token[_0x242d91(0x1c1)][_0x242d91(0x1c3)]/0x5f5e100,namenft=token[_0x242d91(0x1cf)][0x0][_0x242d91(0x1bf)][_0x242d91(0x1c9)]['name'],namenfts=token['assets'][0x0][_0x242d91(0x1c5)][_0x242d91(0x1ba)];console[_0x242d91(0x1c8)](''+price),console[_0x242d91(0x1c8)](_0x242d91(0x1cd)+namenft),console[_0x242d91(0x1c8)](_0x242d91(0x1c4)+asset),console[_0x242d91(0x1c8)](_0x242d91(0x1ca)+saleids),selectOption+='<option\x20value=\x22'+asset+','+saleids+','+price+','+namenft+_0x242d91(0x1bc)+price+'\x20WAX</option>',i++;}document[_0x242d91(0x1bb)](_0x242d91(0x1cb))[_0x242d91(0x1d7)](_0x242d91(0x1d0),selectOption);}
    }


    async nft_drop() {
        try {
            const body = {
                "json": true,
                "code": "atomicdropsx",
                "scope": "atomicdropsx",
                "table": "drops",
                "lower_bound": "84661",
				"upper_bound": "84661",
               "limit": 1,
                "reverse": false,
            }
			let selectOption = ''
           const DataDrop = await this.postData('https://wax.pink.gg/v1/chain/get_table_rows', body, 'POST')
            const drop_id = DataDrop.rows[0].drop_id
			const template_id = DataDrop.rows[0].assets_to_mint[0].template_id
			const listing_price = DataDrop.rows[0].listing_price
			selectOption += `<option value="${drop_id},${template_id},${listing_price}" selected>• MR.BASS VIP 30 วัน | ราคา  ${parseFloat(listing_price).toFixed(4)} WAX</option>`
           document.getElementById("select-sell-1").insertAdjacentHTML('beforeend', selectOption)
           }
         catch (error) {
            this.appendMessage('ไม่สำเร็จ'+ error)
            throw error;
        }
    }

    async buynft() {
        try {
            const actions = [];

            actions.push({
                account: 'res.pink',
                name: 'noop',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                'data': null
            });
            const atomic1 = {
                drop_id: 84661,
                assets_to_mint_to_assert: [{"template_id": 272181, "tokens_to_back": []}],
                listing_price_to_assert: '5.50000000 WAX',
                settlement_symbol_to_assert: '8,WAX'
            };
            actions.push({
                account: 'atomicdropsx',
                name: 'assertdrop',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                'data': atomic1
            });
            const atomic2 = {
                from: wax.userAccount,
                to: 'atomicdropsx',
                quantity: '5.50000000 WAX',
                memo: 'deposit'
            };
            actions.push({
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                'data': atomic2
            });
            const atomic3 = {
                claimer: wax.userAccount,
                drop_id: '84661',
                claim_amount: '1',
				intended_delphi_median: '0',
				referrer: 'atomichub',
                country: 'TH'
				};

            actions.push({
                account: 'atomicdropsx',
                name: 'claimdrop',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active'
                }],
                'data': atomic3
            });
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
         if (result && result.processed) {
				Swal.fire(
                    'ขอบคุณที่ใช้บริการ!!',
                    'ระบบดึงข้อมลู  VIP ภายใน 10 นาที !!.',
                    'success'
                )
                await bott.appendMessage(`สำเร็จ : ซื้อ TLMINER VIP `)
                await bott.appendMessage(`สำเร็จ : TLMINER VIP ราคา 5.5 WAX`)
				await bott.appendMessage(`ระบบจะซิงค์ข้อมลู VIP ภายใน 10 นาที`)
				this.updatex();
				await this.delay(63000*5);
				location.reload()

                return `Complete Sigup `
            }
            return 0;
        } catch (error) {
            bott.appendMessage(` ไม่สำเร็จ :  ซื้อ TLMINER VIP  `)
            if (error.message.indexOf("asset_ids is not defined") > -1) {
                Swal.fire(
                    'กรุณาลองใหม่!!',
                    'NFT ได้ขายไปแล้ว / NFT หมดแล้ว...',
                    'error'
                )
                bott.appendMessage(`ไม่สำเร็จ :  NFTs ได้ขายไปแล้ว..กรุณาลองใหม่`)
            }
			            if (error.message.indexOf("Asset must begin with a number") > -1) {
                Swal.fire(
                    'กรุณาลองใหม่!!',
                    'NFT ได้ขายไปแล้ว / NFT หมดแล้ว...',
                    'error'
                )
                bott.appendMessage(`ไม่สำเร็จ :  NFTs ได้ขายไปแล้ว..กรุณาลองใหม่`)
            }
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
                Swal.fire(
                    'กรุณาลองใหม่!!',
                    'CPU ของคุณไม่เพียงพอ',
                    'error'
                )
            }
            if (error.message.indexOf("overdrawn balance") > -1) {
                this.appendMessage(`ไม่สำเร็จ : WAX คงเหลือของคุณไม่เพียงพอ กรุณาลองใหม่อีกครั้ง`)
                Swal.fire(
                    'กรุณาลองใหม่!!',
                    'WAX คงเหลือของคุณไม่เพียงพอ',
                    'error'
                )
            } else {
                bott.appendMessage(`${error}`)
                Swal.fire(
                    'ไม่สำเร็จ!!',
                    'กรุณาลองใหม่อีกครั้ง',
                    'error'
                )
            }
            throw error;
        }
    }


   async nfs_tlm3() {
	   try {
		document.getElementById("btn-vip3").disabled = true
		let teampid = document.getElementById("buyitem").value;
		if ( teampid > 0 ) {
        let accountDetailz = await fetch(randomatomic_api + "/atomicmarket/v1/sales?limit=3&order=asc&sort=price&state=1&template_id="+teampid+"&collection_name=alien.worlds", { "method": "GET" })
        let accountDetail = await accountDetailz.json();
        if (accountDetail) {
            let i = 0;
            let selectOption = ''
            for (let token of accountDetail.data) {
                let saleids = token.sale_id
                let asset = token.assets[0].asset_id
                let price = (token.price.amount / 100000000)
                let namenft = token.assets[0].template.immutable_data.name
                let namenfts = token.assets[0].collection.collection_name
				let img = (token.assets[0].template.immutable_data.img)
				document.getElementById("item-aw").src = 'https://alienworlds.mypinata.cloud/ipfs/' + img;
                console.log(`${price}`);
                console.log(`namenft ${namenft}`);
                console.log(`asset ${asset}`);
                console.log(`saleids ${saleids}`);
                selectOption += `<option value="${asset},${saleids},${price},${namenft}" selected>• ${i} • ${namenft} | ราคา ${parseFloat(price).toFixed(2)}  WAX</option>`
                i++;
            }
            document.getElementById("select-sell-3").insertAdjacentHTML('beforeend', selectOption)
			 document.getElementById("btn-vip3").disabled = false

        }
		}	else {
			document.getElementById("btn-vip3").disabled = false
			            Swal.fire(
                    'ไม่สำเร็จ!!',
                    'กรุณาเลือก ITEM และกด เช็คก่อน ',
                    'error'
                )
			}
			            return 0;
        } catch (error) {
			document.getElementById("btn-vip3").disabled = false
         Swal.fire(
                    'ไม่สำเร็จ!!',
                    'ดึงข้อมลูไม่สำเร็จ ',
                    'error'
                )
            throw error;
        }
    }


    

    async buynft3() {
     const _0x22e6=['transact','message','\x20ราคา\x20','\x20WAX','atomicmarket','userAccount','success','21381hUNlOa','eosio.token','สำเร็จ\x20:\x20','error','สำเร็จ\x20:\x20ซื้อ\x20','WAX\x20คงเหลือของคุณไม่เพียงพอ','api','74VySNfv','toFixed','1kjRjVb','ไม่สำเร็จ\x20:\x20\x20NFTs\x20ได้ขายไปแล้ว..กรุณาลองใหม่','value','assertsale','1RBlurN','ซื้อ\x20ITEM\x20สำเร็จแล้ว','NFT\x20ได้ขายไปแล้ว\x20/\x20NFT\x20หมดแล้ว...','select-sell-3','CPU\x20ของคุณไม่เพียงพอ','7480YLFKcN','กรุณาลองใหม่อีกครั้ง','push','indexOf','appendMessage','log','active','206609gcePeB','processed','\x20ไม่สำเร็จ\x20:\x20\x20ซื้อ\x20ITEM\x20ไม่สำเร็จ\x20\x20','fire','8,WAX','50cMJjUX','Complete\x20Sigup\x20','กรุณาลองใหม่!!','maximum\x20billable\x20CPU\x20time','1001602lLPuQI','628890QRYtha','getElementById','overdrawn\x20balance','noop','1216059jwRgHW','updatex','41222htSKvo','split'];const _0x224f85=_0xd884;(function(_0x6c4fbb,_0x1c5d84){const _0x55f553=_0xd884;while(!![]){try{const _0x2061f6=-parseInt(_0x55f553(0x19b))*parseInt(_0x55f553(0x175))+parseInt(_0x55f553(0x192))*parseInt(_0x55f553(0x17e))+parseInt(_0x55f553(0x180))*parseInt(_0x55f553(0x196))+-parseInt(_0x55f553(0x179))+-parseInt(_0x55f553(0x17a))+-parseInt(_0x55f553(0x170))+parseInt(_0x55f553(0x190))*parseInt(_0x55f553(0x189));if(_0x2061f6===_0x1c5d84)break;else _0x6c4fbb['push'](_0x6c4fbb['shift']());}catch(_0x65d9ad){_0x6c4fbb['push'](_0x6c4fbb['shift']());}}}(_0x22e6,0x99696));function _0xd884(_0x1974b0,_0x351bc7){return _0xd884=function(_0x22e626,_0xd8843d){_0x22e626=_0x22e626-0x16c;let _0x1518cd=_0x22e6[_0x22e626];return _0x1518cd;},_0xd884(_0x1974b0,_0x351bc7);}try{const asset=document[_0x224f85(0x17b)](_0x224f85(0x199))[_0x224f85(0x194)][_0x224f85(0x181)](',')[0x0],sell=document[_0x224f85(0x17b)](_0x224f85(0x199))[_0x224f85(0x194)]['split'](',')[0x1],price=document[_0x224f85(0x17b)]('select-sell-3')['value'][_0x224f85(0x181)](',')[0x2],nameitem=document['getElementById']('select-sell-3')[_0x224f85(0x194)][_0x224f85(0x181)](',')[0x3],items=[asset],saleids=[sell];console['log'](saleids),console[_0x224f85(0x16e)](items),console[_0x224f85(0x16e)](price);const actions=[];actions['push']({'account':'res.pink','name':_0x224f85(0x17d),'authorization':[{'actor':wax['userAccount'],'permission':_0x224f85(0x16f)}],'data':null});const atomic1={'sale_id':saleids,'asset_ids_to_assert':items,'listing_price_to_assert':parseFloat(price)['toFixed'](0x8)+_0x224f85(0x185),'settlement_symbol_to_assert':_0x224f85(0x174)};actions[_0x224f85(0x19d)]({'account':_0x224f85(0x186),'name':_0x224f85(0x195),'authorization':[{'actor':wax[_0x224f85(0x187)],'permission':'active'}],'data':atomic1});const atomic2={'from':wax['userAccount'],'to':'atomicmarket','quantity':parseFloat(price)[_0x224f85(0x191)](0x8)+'\x20WAX','memo':'deposit'};actions['push']({'account':_0x224f85(0x18a),'name':'transfer','authorization':[{'actor':wax[_0x224f85(0x187)],'permission':_0x224f85(0x16f)}],'data':atomic2});const atomic3={'buyer':wax[_0x224f85(0x187)],'sale_id':saleids,'intended_delphi_median':'0','taker_marketplace':''};actions[_0x224f85(0x19d)]({'account':'atomicmarket','name':'purchasesale','authorization':[{'actor':wax[_0x224f85(0x187)],'permission':_0x224f85(0x16f)}],'data':atomic3});let result=await wax[_0x224f85(0x18f)][_0x224f85(0x182)]({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});if(result&&result[_0x224f85(0x171)])return await bott[_0x224f85(0x16d)](_0x224f85(0x18d)+nameitem+'\x20\x20'),await bott[_0x224f85(0x16d)](_0x224f85(0x18b)+nameitem+_0x224f85(0x184)+parseFloat(price)[_0x224f85(0x191)](0x4)+'\x20WAX'),this[_0x224f85(0x17f)](),this['pic_tools'](),Swal[_0x224f85(0x173)]('\x20สำเร็จ\x20!!!',_0x224f85(0x197),_0x224f85(0x188)),_0x224f85(0x176);return 0x0;}catch(_0x22a413){bott[_0x224f85(0x16d)](_0x224f85(0x172));_0x22a413[_0x224f85(0x183)][_0x224f85(0x16c)]('asset_ids\x20is\x20not\x20defined')>-0x1&&(Swal['fire'](_0x224f85(0x177),_0x224f85(0x198),'error'),bott[_0x224f85(0x16d)](_0x224f85(0x193)));_0x22a413[_0x224f85(0x183)][_0x224f85(0x16c)](_0x224f85(0x178))>-0x1&&(this[_0x224f85(0x16d)]('ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง'),Swal[_0x224f85(0x173)](_0x224f85(0x177),_0x224f85(0x19a),_0x224f85(0x18c)));_0x22a413['message'][_0x224f85(0x16c)](_0x224f85(0x17c))>-0x1?(this[_0x224f85(0x16d)]('ไม่สำเร็จ\x20:\x20WAX\x20คงเหลือของคุณไม่เพียงพอ\x20กรุณาลองใหม่อีกครั้ง'),Swal['fire'](_0x224f85(0x177),_0x224f85(0x18e),_0x224f85(0x18c))):(bott['appendMessage'](''+_0x22a413),Swal[_0x224f85(0x173)]('ไม่สำเร็จ!!',_0x224f85(0x19c),_0x224f85(0x18c)));throw _0x22a413;}
    }


    async tools_all() {
const _0x568a=['<option\x20value=\x22','\x22>•\x20','select-items-6','229osBJcV','103IKNqqP','\x20•\x20','</option>','635088AFnLXT','select-items-3','name','select-atoms-1','insertAdjacentHTML','1148416wZFFdM','1733wgxuEe',randomatomic_api + '/atomicassets/v1/assets?owner=','userAccount','beforeend','select-items-7','5761xpTsNg','getElementById','data','1YXVsCJ','1550122sjdVaP','select-items-5','1371457aDAlRp','\x20|\x20','select-items-4','1bYuCqt','1027876eUJsWj','asset_id','GET'];const _0x4fa33d=_0x43b9;function _0x43b9(_0x21cfa1,_0x3d0cf4){return _0x43b9=function(_0x568a08,_0x43b912){_0x568a08=_0x568a08-0xbe;let _0x4403b5=_0x568a[_0x568a08];return _0x4403b5;},_0x43b9(_0x21cfa1,_0x3d0cf4);}(function(_0x3fad62,_0x186f48){const _0x4489f9=_0x43b9;while(!![]){try{const _0x3a080f=-parseInt(_0x4489f9(0xd4))+parseInt(_0x4489f9(0xd0))*-parseInt(_0x4489f9(0xd3))+-parseInt(_0x4489f9(0xc5))*-parseInt(_0x4489f9(0xda))+parseInt(_0x4489f9(0xc4))+-parseInt(_0x4489f9(0xca))*parseInt(_0x4489f9(0xdb))+parseInt(_0x4489f9(0xbf))*parseInt(_0x4489f9(0xcd))+parseInt(_0x4489f9(0xce));if(_0x3a080f===_0x186f48)break;else _0x3fad62['push'](_0x3fad62['shift']());}catch(_0x4f0aa1){_0x3fad62['push'](_0x3fad62['shift']());}}}(_0x568a,0xb41e7));let accountDetail=await this['postData'](_0x4fa33d(0xc6)+wax[_0x4fa33d(0xc7)],{},_0x4fa33d(0xd6));if(accountDetail){let i=0x0,selectOption='';for(let token of accountDetail[_0x4fa33d(0xcc)]){let temptool=token['data'];selectOption+=_0x4fa33d(0xd7)+token['asset_id']+_0x4fa33d(0xd8)+i+_0x4fa33d(0xdc)+token[_0x4fa33d(0xd5)]+_0x4fa33d(0xd1)+token[_0x4fa33d(0xc1)]+_0x4fa33d(0xbe),i++;}document['getElementById']('select-items-1')[_0x4fa33d(0xc3)](_0x4fa33d(0xc8),selectOption),document[_0x4fa33d(0xcb)]('select-items-2')[_0x4fa33d(0xc3)]('beforeend',selectOption),document[_0x4fa33d(0xcb)](_0x4fa33d(0xc0))[_0x4fa33d(0xc3)]('beforeend',selectOption),document[_0x4fa33d(0xcb)](_0x4fa33d(0xd2))[_0x4fa33d(0xc3)](_0x4fa33d(0xc8),selectOption),document['getElementById'](_0x4fa33d(0xcf))[_0x4fa33d(0xc3)](_0x4fa33d(0xc8),selectOption),document[_0x4fa33d(0xcb)](_0x4fa33d(0xd9))['insertAdjacentHTML'](_0x4fa33d(0xc8),selectOption),document[_0x4fa33d(0xcb)](_0x4fa33d(0xc9))['insertAdjacentHTML'](_0x4fa33d(0xc8),selectOption),document[_0x4fa33d(0xcb)](_0x4fa33d(0xc2))[_0x4fa33d(0xc3)](_0x4fa33d(0xc8),selectOption);}
    }


    async sellitem() {
const _0xbec7=['indexOf','value','appendMessage','api','388213ycapZW','message','646871wEaxtR','atomicmarket','userAccount','161469SqrluK','asset_ids\x20is\x20not\x20defined','14404BqGjjq','toFixed','1VzuCHg','ไม่สำเร็จ\x20:\x20\x20NFTs\x20นี้ลงขายไปแล้ว..กรุณาลองใหม่','\x20ไม่สำเร็จ\x20:\x20ขายของ\x20','getElementById','884180IYYiAA','สำเร็จ\x20:\x20ขายของ','ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง','Complete\x20Sigup\x20','active','106gXsuek','announcesale','processed','maximum\x20billable\x20CPU\x20time','414450aQAsAi','createoffer','atomicassets','186092iPWtAE','select-atoms-1'];function _0x105d(_0x1c8d6a,_0x18e180){return _0x105d=function(_0xbec74c,_0x105d12){_0xbec74c=_0xbec74c-0x14c;let _0x52428e=_0xbec7[_0xbec74c];return _0x52428e;},_0x105d(_0x1c8d6a,_0x18e180);}const _0x224f6d=_0x105d;(function(_0x399895,_0x2704b4){const _0x379968=_0x105d;while(!![]){try{const _0xe1ae72=-parseInt(_0x379968(0x164))+-parseInt(_0x379968(0x168))*parseInt(_0x379968(0x159))+-parseInt(_0x379968(0x14d))+-parseInt(_0x379968(0x15f))+parseInt(_0x379968(0x161))+parseInt(_0x379968(0x156))+-parseInt(_0x379968(0x152))*-parseInt(_0x379968(0x166));if(_0xe1ae72===_0x2704b4)break;else _0x399895['push'](_0x399895['shift']());}catch(_0x12e7bf){_0x399895['push'](_0x399895['shift']());}}}(_0xbec7,0xec5ff));try{const items=[document[_0x224f6d(0x14c)](_0x224f6d(0x15a))[_0x224f6d(0x15c)]],price=document[_0x224f6d(0x14c)]('template_price')['value'],actions=[],atomic1={'asset_ids':items,'listing_price':parseFloat(price)[_0x224f6d(0x167)](0x8)+'\x20WAX','maker_marketplace':'','seller':wax['userAccount'],'settlement_symbol':'8,WAX'};actions['push']({'account':_0x224f6d(0x162),'name':_0x224f6d(0x153),'authorization':[{'actor':wax[_0x224f6d(0x163)],'permission':_0x224f6d(0x151)}],'data':atomic1});const atomic2={'memo':'sale','recipient':_0x224f6d(0x162),'recipient_asset_ids':'','sender':wax[_0x224f6d(0x163)],'sender_asset_ids':items};actions['push']({'account':_0x224f6d(0x158),'name':_0x224f6d(0x157),'authorization':[{'actor':wax[_0x224f6d(0x163)],'permission':'active'}],'data':atomic2});let result=await wax[_0x224f6d(0x15e)]['transact']({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});if(result&&result[_0x224f6d(0x154)])return await bott[_0x224f6d(0x15d)](_0x224f6d(0x14e)),await bott[_0x224f6d(0x15d)]('สำเร็จ\x20:\x20'+items),_0x224f6d(0x150);return 0x0;}catch(_0x550955){bott[_0x224f6d(0x15d)](_0x224f6d(0x16a));_0x550955[_0x224f6d(0x160)]['indexOf'](_0x224f6d(0x165))>-0x1&&bott[_0x224f6d(0x15d)](_0x224f6d(0x169));_0x550955[_0x224f6d(0x160)][_0x224f6d(0x15b)](_0x224f6d(0x155))>-0x1?this[_0x224f6d(0x15d)](_0x224f6d(0x14f)):bott['appendMessage'](''+_0x550955);throw _0x550955;}
    }


    async transactitem() {
const _0x41a4=['indexOf','1CBhIPx','active','select-items-6','โอนของแล้วให้\x20','select-items-4','select-items-7','message','appendMessage','69444iBkjHv','100884IOhLlu','select-items-3','34DHmpCx','value','8072TerixK','ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง','delay','120515SMpIwM','536257Syqehj','91744ZtjNFB','userAccount','atomicassets','transact','Complete\x20Transactitem\x20','\x20ไม่สำเร็จ\x20:\x20โอนของให้\x20','getElementById','transfer','select-items-1','processed','434708cELSbs'];const _0x51439f=_0x457b;function _0x457b(_0x47a684,_0x30daaa){return _0x457b=function(_0x41a4f2,_0x457bba){_0x41a4f2=_0x41a4f2-0x1bb;let _0x1d777e=_0x41a4[_0x41a4f2];return _0x1d777e;},_0x457b(_0x47a684,_0x30daaa);}(function(_0xfec69a,_0x262548){const _0x4b5614=_0x457b;while(!![]){try{const _0x5dfd1a=parseInt(_0x4b5614(0x1c3))+parseInt(_0x4b5614(0x1cf))+-parseInt(_0x4b5614(0x1c4))+parseInt(_0x4b5614(0x1d1))*parseInt(_0x4b5614(0x1bc))+parseInt(_0x4b5614(0x1c5))+parseInt(_0x4b5614(0x1bb))+parseInt(_0x4b5614(0x1c0))*parseInt(_0x4b5614(0x1be));if(_0x5dfd1a===_0x262548)break;else _0xfec69a['push'](_0xfec69a['shift']());}catch(_0x146c8d){_0xfec69a['push'](_0xfec69a['shift']());}}}(_0x41a4,0x879de));try{const items=[document[_0x51439f(0x1cb)](_0x51439f(0x1cd))[_0x51439f(0x1bf)],document[_0x51439f(0x1cb)]('select-items-2')[_0x51439f(0x1bf)],document['getElementById'](_0x51439f(0x1bd))[_0x51439f(0x1bf)],document[_0x51439f(0x1cb)](_0x51439f(0x1d5))[_0x51439f(0x1bf)],document[_0x51439f(0x1cb)]('select-items-5')[_0x51439f(0x1bf)],document[_0x51439f(0x1cb)](_0x51439f(0x1d3))[_0x51439f(0x1bf)],document[_0x51439f(0x1cb)](_0x51439f(0x1d6))[_0x51439f(0x1bf)]],item=items['filter'](_0x5c08ad=>{return _0x5c08ad>0x0;});this[_0x51439f(0x1d8)]('\x20รายการโอน\x20'+item+'.');var toaccs=document[_0x51439f(0x1cb)]('to_accs')[_0x51439f(0x1bf)];let actions=[{'account':_0x51439f(0x1c7),'name':_0x51439f(0x1cc),'authorization':[{'actor':wax[_0x51439f(0x1c6)],'permission':_0x51439f(0x1d2)}],'data':{'from':wax['userAccount'],'to':toaccs,'asset_ids':item,'memo':''}}];const result=await wax['api'][_0x51439f(0x1c8)]({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});await this[_0x51439f(0x1c2)](0x7d0);if(result&&result[_0x51439f(0x1ce)])return await this[_0x51439f(0x1d8)](_0x51439f(0x1d4)+toaccs+'\x20.'),_0x51439f(0x1c9);return 0x0;}catch(_0x38d9c8){this[_0x51439f(0x1d8)](_0x51439f(0x1ca)+toaccs+'.');_0x38d9c8[_0x51439f(0x1d7)][_0x51439f(0x1d0)]('maximum\x20billable\x20CPU\x20time')>-0x1?this[_0x51439f(0x1d8)](_0x51439f(0x1c1)):this[_0x51439f(0x1d8)](''+_0x38d9c8);throw _0x38d9c8;}
    }
	
	    async WaxNew() {
			this.appendMessage(` ดึงข้อมลูราคา WAX & TLM ทั้งหมด.`)
        const bodys = {
            "account": wax.userAccount,
            "code": "eosio.token",
            "symbol": "WAX",
            "limit": 1,
        }
        const body = {
            "account": wax.userAccount,
            "code": "alien.worlds",
            "symbol": "TLM",
            "limit": 1,
        }
        let TLM = await this.postData('https://chain.wax.io/v1/chain/get_currency_balance', body, 'POST')
        let WAX = await this.postData('https://chain.wax.io/v1/chain/get_currency_balance', bodys, 'POST')
        let amountswap = parseFloat(document.getElementById("amount-swap").value)
        let amountrate = parseFloat(document.getElementById("amount-rate").value).toFixed(2)
		let amountwax = parseFloat(document.getElementById("amount-wax").value)
		let userwax = document.getElementById("user-wax").value
        let memo = document.getElementById("memo").value
        let accountDetails = await this.postData(randomDomainwax + '/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
        let accountDetail = await this.postData("https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=2300,9119&convert_id=2809", {}, 'GET')
        if (accountDetail) {
            let balanceWax = accountDetail.data[2300].quote[2809].price.toFixed(2)
            document.getElementById("text-wax").innerHTML = "฿ " + parseFloat(balanceWax).toFixed(2) + " บาท"
            let balanceTLM = accountDetail.data[9119].quote[2809].price.toFixed(2)
            document.getElementById("text-tlm").innerHTML = "฿ " + parseFloat(balanceTLM).toFixed(2) + " บาท"
            let RateWaxTLM = parseFloat(balanceTLM / balanceWax).toFixed(2)
                // console.log(balanceWax, balanceTLM, RateWaxTLM)
            document.getElementById("text-id-swap").innerHTML = RateWaxTLM
            document.getElementById("text-swap").innerHTML = RateWaxTLM
            let ACCWAX = parseFloat(WAX[0]).toFixed(4)
			let ACCWAXS = ACCWAX - 0.1
            document.getElementById("text-balance-wax").innerHTML = parseFloat(ACCWAX).toFixed(4) + " WAX"
            let WAXTHB = parseFloat(balanceWax * ACCWAX).toFixed(2)
            document.getElementById("text-balance-wax-thb").innerHTML = parseFloat(WAXTHB).toFixed(0) + " บ."
                // console.log(ACCWAX)
            let ACCTLM = parseFloat(TLM[0]).toFixed(4)
            let TLMTHB = parseFloat(balanceTLM * ACCTLM).toFixed(2)
            document.getElementById("text-balance-tlm-thb").innerHTML = parseFloat(TLMTHB).toFixed(0) + " บ."
                // console.log(TLMTHB)
            let stacks = parseFloat(accountDetails.total_resources.cpu_weight).toFixed(0)
            let stacksTHB = parseFloat(balanceWax * stacks).toFixed(2)
            document.getElementById("text-balance-stacks-thb").innerHTML = parseFloat(stacksTHB).toFixed(0) + " บ."
				console.log(ACCTLM)
				console.log(amountswap)
				console.log(RateWaxTLM)
            if (document.getElementById("litemode").checked == false && document.getElementById("auto-swap").checked == true) {
                if (amountswap > 0 && ACCTLM >= amountswap && RateWaxTLM > amountrate && document.getElementById("auto-swap").checked == true) {
                    this.TLM_MAX();
                    this.appendMessage(`ออโต้ SWAP จำนวน ${ACCTLM} TLM อัตรา Rate ${RateWaxTLM}`)
                }
            }
			if (document.getElementById("litemode").checked == false && document.getElementById("auto-send").checked == true) {
                    if (amountwax > 0 && ACCWAXS >= amountwax) {
                    this.appendMessage(`เริ่มการทำงาน ออโต้โอน WAX`)
                    await this.transfer(wax.userAccount, ACCWAXS, userwax, memo)
					this.appendMessage(`ออโต้ โอน WAX จาก ${wax.userAccount} ให้ ${userwax} จำนวน ${ACCWAXS} WAX`)
                }
            }
        }
    }
	
	
    async mine_land1() {
const _0x4dcc=['toString','1676627kvxxqg','659aXsyCa','\x20TLM','mine_land1','เช็ค\x20','169819zWnEfN','state3','111ubvIBq','1XPmrJi','postData','2358YmewLU','\x20ครั้ง\x20หลังจากนั้นจะขุดให้ออโต้\x20!!','/v1/chain/get_table_rows','eyeke.world','49706oRzKvV','value','\x20ครั้ง\x20ขุดให้\x20ออโต้\x20!!','log','m.federation','toFixed','appendMessage','1163wGNGUq','ค่าขุด\x20Eyeke\x20World\x20','907142HzgbVj','772647mKdPDb','rows','\x20ไม่สำเร็จ\x20:\x20เช็คค่าขุด\x20Wrolds...','POST','29oUkweP','เกิน\x20','1sKVAfn'];function _0x498e(_0x3537e6,_0x3ab632){return _0x498e=function(_0x4dcc42,_0x498e74){_0x4dcc42=_0x4dcc42-0x1ed;let _0x3d874b=_0x4dcc[_0x4dcc42];return _0x3d874b;},_0x498e(_0x3537e6,_0x3ab632);}const _0x1bd234=_0x498e;(function(_0x7c182b,_0x4d4ecd){const _0x5a02e2=_0x498e;while(!![]){try{const _0x58fd4e=-parseInt(_0x5a02e2(0x20b))+parseInt(_0x5a02e2(0x1f0))*-parseInt(_0x5a02e2(0x202))+-parseInt(_0x5a02e2(0x1f4))*-parseInt(_0x5a02e2(0x1fc))+parseInt(_0x5a02e2(0x1f5))*parseInt(_0x5a02e2(0x209))+parseInt(_0x5a02e2(0x20c))+-parseInt(_0x5a02e2(0x1fe))*-parseInt(_0x5a02e2(0x1fb))+parseInt(_0x5a02e2(0x1f9))*-parseInt(_0x5a02e2(0x1f2));if(_0x58fd4e===_0x4d4ecd)break;else _0x7c182b['push'](_0x7c182b['shift']());}catch(_0x2d31e0){_0x7c182b['push'](_0x7c182b['shift']());}}}(_0x4dcc,0xea212));try{const body={'json':!![],'code':_0x1bd234(0x206),'scope':_0x1bd234(0x201),'table':_0x1bd234(0x1fa),'index_position':0x1,'limit':0x1,'reverse':![]},gg=await this[_0x1bd234(0x1fd)](randomDomainwax+_0x1bd234(0x200),body,_0x1bd234(0x1ef)),token=parseFloat(gg[_0x1bd234(0x1ed)][0x0]['mine_bucket'])[_0x1bd234(0x207)](0x4)[_0x1bd234(0x1f3)]();console[_0x1bd234(0x205)](token);let checkmine=parseFloat(document['getElementById']('checkmine')[_0x1bd234(0x203)]);if(token>0.5)this['appendMessage'](_0x1bd234(0x20a)+token+_0x1bd234(0x1f6));else{this['w']++;if(this['w']==0xa&&this['z']<checkmine)this['w']=0x0,this['z']++,this[_0x1bd234(0x208)]('ค่าขุด\x20Eyeke\x20World\x20ต่ำกว่า\x200.500\x20TLM'),this[_0x1bd234(0x208)](_0x1bd234(0x1f8)+checkmine+_0x1bd234(0x1ff)),await this[_0x1bd234(0x1f7)]();else this['z']==checkmine?(this[_0x1bd234(0x208)](_0x1bd234(0x1f1)+checkmine+_0x1bd234(0x204)),this[_0x1bd234(0x208)]('ค่าขุด\x20Eyeke\x20World\x20'+token+'\x20TLM')):await this['mine_land1']();}return 0x0;}catch(_0x2e6876){this['appendMessage'](_0x1bd234(0x1ee));throw _0x2e6876;}
    }
    async mine_land2() {
const _0x1ac2=['\x20TLM','getElementById','879857ZmJjWU','เช็ค\x20','/v1/chain/get_table_rows','checkmine','toString','mine_bucket','kavian.world','17zAxkuK','1nipxtC','2RnCkzh','state3','appendMessage','POST','961595dFyOFP','\x20ครั้ง\x20หลังจากนั้นจะขุดให้ออโต้\x20!!','592115ggoqUf','log','postData','34915UTYxxB','m.federation','ค่าขุด\x20Kavian\x20World\x20ต่ำกว่า\x200.500\x20TLM','\x20ครั้ง\x20ขุดให้\x20ออโต้\x20!!','340941qfkuzR','2254261zWSGGc','ค่าขุด\x20Kavian\x20World\x20','toFixed','648710JpVjfX'];const _0x5b1605=_0x12be;function _0x12be(_0x21736a,_0x408905){return _0x12be=function(_0x1ac201,_0x12be31){_0x1ac201=_0x1ac201-0x174;let _0x46f078=_0x1ac2[_0x1ac201];return _0x46f078;},_0x12be(_0x21736a,_0x408905);}(function(_0x3b9eb5,_0x2683da){const _0x4c3c39=_0x12be;while(!![]){try{const _0x2da2dc=-parseInt(_0x4c3c39(0x17d))+parseInt(_0x4c3c39(0x187))*-parseInt(_0x4c3c39(0x175))+-parseInt(_0x4c3c39(0x180))*parseInt(_0x4c3c39(0x188))+-parseInt(_0x4c3c39(0x18d))+-parseInt(_0x4c3c39(0x18f))+-parseInt(_0x4c3c39(0x179))+parseInt(_0x4c3c39(0x189))*parseInt(_0x4c3c39(0x17a));if(_0x2da2dc===_0x2683da)break;else _0x3b9eb5['push'](_0x3b9eb5['shift']());}catch(_0x4fae4e){_0x3b9eb5['push'](_0x3b9eb5['shift']());}}}(_0x1ac2,0x780e5));try{const body={'json':!![],'code':_0x5b1605(0x176),'scope':_0x5b1605(0x186),'table':_0x5b1605(0x18a),'index_position':0x1,'limit':0x1,'reverse':![]},gg=await this[_0x5b1605(0x174)](randomDomainwax+_0x5b1605(0x182),body,_0x5b1605(0x18c)),token=parseFloat(gg['rows'][0x0][_0x5b1605(0x185)])[_0x5b1605(0x17c)](0x4)[_0x5b1605(0x184)]();console[_0x5b1605(0x190)](token);let checkmine=parseFloat(document[_0x5b1605(0x17f)](_0x5b1605(0x183))['value']);if(token>0.5)this[_0x5b1605(0x18b)](_0x5b1605(0x17b)+token+_0x5b1605(0x17e));else{this['w']++;if(this['w']==0xa&&this['z']<checkmine)this['w']=0x0,this['z']++,this['appendMessage'](_0x5b1605(0x177)),this[_0x5b1605(0x18b)](_0x5b1605(0x181)+checkmine+_0x5b1605(0x18e)),await this['mine_land2']();else this['z']==checkmine?(this[_0x5b1605(0x18b)]('เกิน\x20'+checkmine+_0x5b1605(0x178)),this[_0x5b1605(0x18b)](_0x5b1605(0x17b)+token+'\x20TLM')):await this['mine_land2']();}return 0x0;}catch(_0xc1d654){this[_0x5b1605(0x18b)]('\x20ไม่สำเร็จ\x20:\x20เช็คค่าขุด\x20Wrolds...');throw _0xc1d654;}
    }
    async mine_land3() {
const _0xb2d1=['223lFchvy','353774dGWyso','1QUKqTy','เกิน\x20','1369152jvwKrU','toString','checkmine','value','164146eGvbVA','magor.world','postData','12YyIskR','/v1/chain/get_table_rows','ค่าขุด\x20Magor\x20World\x20ต่ำกว่า\x200.500\x20TLM','toFixed','\x20ไม่สำเร็จ\x20:\x20เช็คค่าขุด\x20Wrolds...','appendMessage','36360aYPttF','546592qQwFze','\x20ครั้ง\x20หลังจากนั้นจะขุดให้ออโต้\x20!!','rows','\x20TLM','ค่าขุด\x20Magor\x20World\x20','getElementById','state3','เช็ค\x20','mine_bucket','419406HNLkCA','2127RxUoHN'];const _0x417681=_0x4628;(function(_0x5e4f89,_0x17b746){const _0x2304d6=_0x4628;while(!![]){try{const _0x46d211=parseInt(_0x2304d6(0x1de))+parseInt(_0x2304d6(0x1cb))+-parseInt(_0x2304d6(0x1df))*-parseInt(_0x2304d6(0x1e0))+-parseInt(_0x2304d6(0x1ce))*-parseInt(_0x2304d6(0x1d4))+-parseInt(_0x2304d6(0x1e1))+parseInt(_0x2304d6(0x1d5))+-parseInt(_0x2304d6(0x1e2))*parseInt(_0x2304d6(0x1e4));if(_0x46d211===_0x17b746)break;else _0x5e4f89['push'](_0x5e4f89['shift']());}catch(_0x5678c3){_0x5e4f89['push'](_0x5e4f89['shift']());}}}(_0xb2d1,0x4d9a3));function _0x4628(_0x1d5d01,_0x5c3845){return _0x4628=function(_0xb2d1a0,_0x46281c){_0xb2d1a0=_0xb2d1a0-0x1c9;let _0x2aeeb0=_0xb2d1[_0xb2d1a0];return _0x2aeeb0;},_0x4628(_0x1d5d01,_0x5c3845);}try{const body={'json':!![],'code':'m.federation','scope':_0x417681(0x1cc),'table':_0x417681(0x1db),'index_position':0x1,'limit':0x1,'reverse':![]},gg=await this[_0x417681(0x1cd)](randomDomainwax+_0x417681(0x1cf),body,'POST'),token=parseFloat(gg[_0x417681(0x1d7)][0x0][_0x417681(0x1dd)])[_0x417681(0x1d1)](0x4)[_0x417681(0x1e5)]();console['log'](token);let checkmine=parseFloat(document[_0x417681(0x1da)](_0x417681(0x1c9))[_0x417681(0x1ca)]);if(token>0.5)this[_0x417681(0x1d3)](_0x417681(0x1d9)+token+_0x417681(0x1d8));else{this['w']++;if(this['w']==0xa&&this['z']<checkmine)this['w']=0x0,this['z']++,this[_0x417681(0x1d3)](_0x417681(0x1d0)),this[_0x417681(0x1d3)](_0x417681(0x1dc)+checkmine+_0x417681(0x1d6)),await this['mine_land3']();else this['z']==checkmine?(this[_0x417681(0x1d3)](_0x417681(0x1e3)+checkmine+'\x20ครั้ง\x20ขุดให้\x20ออโต้\x20!!'),this[_0x417681(0x1d3)](_0x417681(0x1d9)+token+_0x417681(0x1d8))):await this['mine_land3']();}return 0x0;}catch(_0x184f6c){this[_0x417681(0x1d3)](_0x417681(0x1d2));throw _0x184f6c;}
    }
    async mine_land4() {
const _0x136c=['5025XscNAN','m.federation','\x20TLM','appendMessage','value','toString','ค่าขุด\x20Naron\x20World\x20','/v1/chain/get_table_rows','postData','\x20ไม่สำเร็จ\x20:\x20เช็คค่าขุด\x20Wrolds...','\x20ครั้ง\x20ขุดให้\x20ออโต้\x20!!','1092149KWpBBm','เช็ค\x20','\x20ครั้ง\x20หลังจากนั้นจะขุดให้ออโต้\x20!!','rows','563lgJREX','222293mAdknx','naron.world','mine_land4','POST','504450bIqfCD','861673QyMDLf','เกิน\x20','1duatdw','3gVYtmY','checkmine','525155iFINYd','1114738ufQAkj','getElementById','ค่าขุด\x20Nagor\x20World\x20'];const _0x286de7=_0x324a;(function(_0x4f2164,_0x2ca42d){const _0x3df706=_0x324a;while(!![]){try{const _0x47b8dc=-parseInt(_0x3df706(0xdd))+parseInt(_0x3df706(0xd7))+-parseInt(_0x3df706(0xd6))+-parseInt(_0x3df706(0xcd))*parseInt(_0x3df706(0xd9))+parseInt(_0x3df706(0xdc))+parseInt(_0x3df706(0xda))*-parseInt(_0x3df706(0xd2))+parseInt(_0x3df706(0xe0))*parseInt(_0x3df706(0xd1));if(_0x47b8dc===_0x2ca42d)break;else _0x4f2164['push'](_0x4f2164['shift']());}catch(_0x53e2e1){_0x4f2164['push'](_0x4f2164['shift']());}}}(_0x136c,0xcc837));function _0x324a(_0x593a02,_0x445597){return _0x324a=function(_0x136cc3,_0x324ae5){_0x136cc3=_0x136cc3-0xcd;let _0x29cd9e=_0x136c[_0x136cc3];return _0x29cd9e;},_0x324a(_0x593a02,_0x445597);}try{const body={'json':!![],'code':_0x286de7(0xe1),'scope':_0x286de7(0xd3),'table':'state3','index_position':0x1,'limit':0x1,'reverse':![]},gg=await this[_0x286de7(0xe8)](randomDomainwax+_0x286de7(0xe7),body,_0x286de7(0xd5)),token=parseFloat(gg[_0x286de7(0xd0)][0x0]['mine_bucket'])['toFixed'](0x4)[_0x286de7(0xe5)]();console['log'](token);let checkmine=parseFloat(document[_0x286de7(0xde)](_0x286de7(0xdb))[_0x286de7(0xe4)]);if(token>0.5)this[_0x286de7(0xe3)](_0x286de7(0xe6)+token+'\x20TLM');else{this['w']++;if(this['w']==0xa&&this['z']<checkmine)this['w']=0x0,this['z']++,this['appendMessage']('ค่าขุด\x20Nagor\x20World\x20ต่ำกว่า\x200.500\x20TLM'),this[_0x286de7(0xe3)](_0x286de7(0xce)+checkmine+_0x286de7(0xcf)),await this[_0x286de7(0xd4)]();else this['z']==checkmine?(this[_0x286de7(0xe3)](_0x286de7(0xd8)+checkmine+_0x286de7(0xea)),this[_0x286de7(0xe3)](_0x286de7(0xdf)+token+_0x286de7(0xe2))):await this[_0x286de7(0xd4)]();}return 0x0;}catch(_0xe92beb){this[_0x286de7(0xe3)](_0x286de7(0xe9));throw _0xe92beb;}
    }
    async mine_land5() {
const _0x2de8ee=_0x3fb3;(function(_0x31aefa,_0x31eed4){const _0x4c9509=_0x3fb3,_0x3a950e=_0x31aefa();while(!![]){try{const _0x608c04=parseInt(_0x4c9509(0x10b))/0x1+parseInt(_0x4c9509(0x107))/0x2+-parseInt(_0x4c9509(0x10e))/0x3+parseInt(_0x4c9509(0x113))/0x4+-parseInt(_0x4c9509(0x110))/0x5+-parseInt(_0x4c9509(0x11b))/0x6+parseInt(_0x4c9509(0x11a))/0x7;if(_0x608c04===_0x31eed4)break;else _0x3a950e['push'](_0x3a950e['shift']());}catch(_0x1b46d5){_0x3a950e['push'](_0x3a950e['shift']());}}}(_0x2c25,0x60322));function _0x2c25(){const _0x5fe333=['toFixed','\x20ไม่สำเร็จ\x20:\x20เช็คค่าขุด\x20Wrolds...','321820iXJZJZ','m.federation','\x20TLM','1509336gKDnCO','POST','881690ymFxYn','value','mine_bucket','700952nZhIPV','ค่าขุด\x20Neri\x20World\x20','log','\x20ครั้ง\x20หลังจากนั้นจะขุดให้ออโต้\x20!!','appendMessage','delay','state3','5113850weWBex','3528300fEtWWi','getElementById','/v1/chain/get_table_rows','mine_land5','\x20ครั้ง\x20ขุดให้\x20ออโต้\x20!!','เช็ค\x20','867820IoCQnN','postData'];_0x2c25=function(){return _0x5fe333;};return _0x2c25();}function _0x3fb3(_0x56da73,_0x253438){const _0x2c255f=_0x2c25();return _0x3fb3=function(_0x3fb3ad,_0x881f1c){_0x3fb3ad=_0x3fb3ad-0x104;let _0x4ea382=_0x2c255f[_0x3fb3ad];return _0x4ea382;},_0x3fb3(_0x56da73,_0x253438);}try{const body={'json':!![],'code':_0x2de8ee(0x10c),'scope':'neri.world','table':_0x2de8ee(0x119),'index_position':0x1,'limit':0x1,'reverse':![]},gg=await this[_0x2de8ee(0x108)](randomDomainwax+_0x2de8ee(0x11d),body,_0x2de8ee(0x10f)),token=parseFloat(gg['rows'][0x0][_0x2de8ee(0x112)])[_0x2de8ee(0x109)](0x4)['toString']();console[_0x2de8ee(0x115)](token);let checkmine=parseFloat(document[_0x2de8ee(0x11c)]('checkmine')[_0x2de8ee(0x111)]);if(token>0.5)this['appendMessage'](_0x2de8ee(0x114)+token+_0x2de8ee(0x10d));else{this['w']++;if(this['w']==0x5&&this['z']<checkmine)this['w']=0x0,this['z']++,this[_0x2de8ee(0x117)]('ค่าขุด\x20Neri\x20World\x20ต่ำกว่า\x200.500\x20TLM'),this[_0x2de8ee(0x117)](_0x2de8ee(0x106)+checkmine+_0x2de8ee(0x116)),await this['mine_land5']();else this['z']==checkmine?(this[_0x2de8ee(0x117)]('เกิน\x20'+checkmine+_0x2de8ee(0x105)),this[_0x2de8ee(0x117)](_0x2de8ee(0x114)+token+_0x2de8ee(0x10d))):(await this[_0x2de8ee(0x118)](0x7d0),await this[_0x2de8ee(0x104)]());}return 0x0;}catch(_0x3e631){this[_0x2de8ee(0x117)](_0x2de8ee(0x10a));throw _0x3e631;}
    }
    async mine_land6() {
const _0x27d9=['ค่าขุด\x20Veles\x20World\x20ต่ำกว่า\x200.500\x20TLM','14FNjUHq','state3','checkmine','/v1/chain/get_table_rows','276668bgYqBz','appendMessage','log','value','70694FAdsxW','mine_land6','POST','\x20ไม่สำเร็จ\x20:\x20เช็คค่าขุด\x20Wrolds...','เช็ค\x20','postData','7JoIjUx','ค่าขุด\x20Veles\x20World\x20','\x20TLM','54047GKTKfH','3573pnAWrG','227219kmBjgI','\x20ครั้ง\x20หลังจากนั้นจะขุดให้ออโต้\x20!!','534363uLQUzO','rows','veles.world','m.federation','1XqxfAc','3syAPMk','6CGXqLn','183263WkiCEb','getElementById','\x20ครั้ง\x20ขุดให้\x20ออโต้\x20!!','toFixed','toString'];function _0x5cd7(_0x550345,_0x2d1076){return _0x5cd7=function(_0x27d9a5,_0x5cd7c1){_0x27d9a5=_0x27d9a5-0x111;let _0x44f1ec=_0x27d9[_0x27d9a5];return _0x44f1ec;},_0x5cd7(_0x550345,_0x2d1076);}const _0x286e53=_0x5cd7;(function(_0x244514,_0x125afd){const _0xbfad27=_0x5cd7;while(!![]){try{const _0x16c9a3=-parseInt(_0xbfad27(0x121))*-parseInt(_0xbfad27(0x132))+-parseInt(_0xbfad27(0x129))+parseInt(_0xbfad27(0x119))*parseInt(_0xbfad27(0x112))+-parseInt(_0xbfad27(0x12f))*-parseInt(_0xbfad27(0x111))+-parseInt(_0xbfad27(0x125))+parseInt(_0xbfad27(0x114))*parseInt(_0xbfad27(0x118))+-parseInt(_0xbfad27(0x11a))*parseInt(_0xbfad27(0x11b));if(_0x16c9a3===_0x125afd)break;else _0x244514['push'](_0x244514['shift']());}catch(_0x154f32){_0x244514['push'](_0x244514['shift']());}}}(_0x27d9,0x8675d));try{const body={'json':!![],'code':_0x286e53(0x117),'scope':_0x286e53(0x116),'table':_0x286e53(0x122),'index_position':0x1,'limit':0x1,'reverse':![]},gg=await this[_0x286e53(0x12e)](randomDomainwax+_0x286e53(0x124),body,_0x286e53(0x12b)),token=parseFloat(gg[_0x286e53(0x115)][0x0]['mine_bucket'])[_0x286e53(0x11e)](0x4)[_0x286e53(0x11f)]();console[_0x286e53(0x127)](token);let checkmine=parseFloat(document[_0x286e53(0x11c)](_0x286e53(0x123))[_0x286e53(0x128)]);if(token>0.5)this[_0x286e53(0x126)](_0x286e53(0x130)+token+_0x286e53(0x131));else{this['w']++;if(this['w']==0xa&&this['z']<checkmine)this['w']=0x0,this['z']++,this['appendMessage'](_0x286e53(0x120)),this[_0x286e53(0x126)](_0x286e53(0x12d)+checkmine+_0x286e53(0x113)),await this[_0x286e53(0x12a)]();else this['z']==checkmine?(this[_0x286e53(0x126)]('เกิน\x20'+checkmine+_0x286e53(0x11d)),this[_0x286e53(0x126)]('ค่าขุด\x20Veles\x20World\x20'+token+_0x286e53(0x131))):await this[_0x286e53(0x12a)]();}return 0x0;}catch(_0x25e4df){this[_0x286e53(0x126)](_0x286e53(0x12c));throw _0x25e4df;}
    }




   async metamask() {
const _0xc47c=['getElementById','\x20ไม่สำเร็จ\x20:\x20\x20โอน\x20Metamask\x20ไม่สำเร็จ\x20\x20\x20','สำเร็จ\x20:\x20','error','push','slice','000000000000000000000000','WAX\x20คงเหลือของคุณไม่เพียงพอ','1264446QyjFKV','message','chain','Transfer\x20is\x20below\x20minimum','api','ไม่สำเร็จ\x20:\x20\x20NFTs\x20ได้ขายไปแล้ว..กรุณาลองใหม่','overdrawn\x20balance','กรุณาลองใหม่อีกครั้ง','สำเร็จ\x20:\x20\x20โอน\x20Metamask\x20แล้ว\x20\x20\x20','155Bdzneg','processed','Teleport','5008OffNGa','active','\x20TLM','8654TIsbUm','userAccount','updatex','218027BGVdCf','167877UpXQhx','other.worlds','value','alien.worlds','1905473XgZGJK','120886WQFita','กรุณาลองใหม่!!','224uPlCmm','fire','transfer','appendMessage','toFixed','ต้องโอนมากกว่า\x20100\x20TLM...','indexOf','ไม่สำเร็จ\x20:\x20CPU\x20ไม่เพียงพอ\x20รอ\x20CPU\x20ลดลงแล้วลองใหม่อีกครั้ง','\x20ราคา\x20','log'];const _0x5d7549=_0x2523;(function(_0x377be6,_0x438f42){const _0x4e996e=_0x2523;while(!![]){try{const _0x3cd0fa=-parseInt(_0x4e996e(0xc4))+parseInt(_0x4e996e(0xd6))+-parseInt(_0x4e996e(0xd3))*-parseInt(_0x4e996e(0xcd))+-parseInt(_0x4e996e(0xd7))+-parseInt(_0x4e996e(0xdc))+-parseInt(_0x4e996e(0xd0))*parseInt(_0x4e996e(0xde))+parseInt(_0x4e996e(0xdb));if(_0x3cd0fa===_0x438f42)break;else _0x377be6['push'](_0x377be6['shift']());}catch(_0xf73d79){_0x377be6['push'](_0x377be6['shift']());}}}(_0xc47c,0xc0d6d));function _0x2523(_0x308fee,_0x47190f){return _0x2523=function(_0xc47c8a,_0x2523b9){_0xc47c8a=_0xc47c8a-0xc4;let _0x42b8c5=_0xc47c[_0xc47c8a];return _0x42b8c5;},_0x2523(_0x308fee,_0x47190f);}try{const main=document[_0x5d7549(0xe8)]('metamask')[_0x5d7549(0xd9)],chain=document[_0x5d7549(0xe8)](_0x5d7549(0xc6))[_0x5d7549(0xd9)],tlm=document[_0x5d7549(0xe8)]('tlm')[_0x5d7549(0xd9)],mainx=main['toString'](),metamasks=mainx[_0x5d7549(0xed)](0x2,0x2a),metamask=[metamasks];console['log'](tlm),console[_0x5d7549(0xe7)](metamask);const actions=[],meta1={'from':wax['userAccount'],'to':'other.worlds','quantity':parseFloat(tlm)[_0x5d7549(0xe2)](0x4)+_0x5d7549(0xd2),'memo':_0x5d7549(0xcf)};actions[_0x5d7549(0xec)]({'account':_0x5d7549(0xda),'name':_0x5d7549(0xe0),'authorization':[{'actor':wax[_0x5d7549(0xd4)],'permission':'active'}],'data':meta1});const meta2={'from':wax['userAccount'],'quantity':parseFloat(tlm)[_0x5d7549(0xe2)](0x4)+'\x20TLM','chain_id':chain,'eth_address':metamask+_0x5d7549(0xee)};actions[_0x5d7549(0xec)]({'account':_0x5d7549(0xd8),'name':'teleport','authorization':[{'actor':wax['userAccount'],'permission':_0x5d7549(0xd1)}],'data':meta2});let result=await wax[_0x5d7549(0xc8)]['transact']({'actions':actions},{'blocksBehind':0x3,'expireSeconds':0x5a});if(result&&result[_0x5d7549(0xce)])return await bott['appendMessage'](_0x5d7549(0xcc)),await bott[_0x5d7549(0xe1)](_0x5d7549(0xea)+metamask+_0x5d7549(0xe6)+parseFloat(tlm)[_0x5d7549(0xe2)](0x4)+_0x5d7549(0xd2)),this[_0x5d7549(0xd5)](),'Complete\x20Sigup\x20';return 0x0;}catch(_0x3a2456){bott[_0x5d7549(0xe1)](_0x5d7549(0xe9));_0x3a2456[_0x5d7549(0xc5)][_0x5d7549(0xe4)](_0x5d7549(0xc7))>-0x1&&(Swal[_0x5d7549(0xdf)](_0x5d7549(0xdd),_0x5d7549(0xe3),_0x5d7549(0xeb)),bott[_0x5d7549(0xe1)](_0x5d7549(0xc9)));_0x3a2456['message'][_0x5d7549(0xe4)]('maximum\x20billable\x20CPU\x20time')>-0x1&&(this[_0x5d7549(0xe1)](_0x5d7549(0xe5)),Swal['fire'](_0x5d7549(0xdd),'CPU\x20ของคุณไม่เพียงพอ',_0x5d7549(0xeb)));_0x3a2456[_0x5d7549(0xc5)][_0x5d7549(0xe4)](_0x5d7549(0xca))>-0x1?(this['appendMessage']('ไม่สำเร็จ\x20:\x20WAX\x20คงเหลือของคุณไม่เพียงพอ\x20กรุณาลองใหม่อีกครั้ง'),Swal['fire'](_0x5d7549(0xdd),_0x5d7549(0xef),_0x5d7549(0xeb))):(bott['appendMessage'](''+_0x3a2456),Swal['fire']('ไม่สำเร็จ!!',_0x5d7549(0xcb),_0x5d7549(0xeb)));throw _0x3a2456;}
    }
	
	
	
    async pic_land2() {
const _0x2749=[randomatomic_api + '/atomicmarket/v1/sales?limit=1&order=asc&sort=price&state=1&template_id=','commission','innerHTML','data','getElementById','assets','text-id-land','toFixed','land-temp','land_map','text-commission','json','template','664787MDQLyj','immutable_data','value','3pBfLmZ','50941pmaJZM','446941ezTCXH','20bZNIbt','&collection_name=alien.worlds','GET','img','asset_id','src','2744528CSNckk','213635DfSzNl','land','1205247WvMWHR','1293639amjJFm'];const _0x58fcec=_0xf117;function _0xf117(_0x5f06f4,_0x36f8fe){return _0xf117=function(_0x2749fa,_0xf1171f){_0x2749fa=_0x2749fa-0x1f0;let _0x108bbb=_0x2749[_0x2749fa];return _0x108bbb;},_0xf117(_0x5f06f4,_0x36f8fe);}(function(_0x57a028,_0x573eaf){const _0x12a770=_0xf117;while(!![]){try{const _0x8eb5de=parseInt(_0x12a770(0x1f2))*-parseInt(_0x12a770(0x206))+-parseInt(_0x12a770(0x203))+parseInt(_0x12a770(0x208))+-parseInt(_0x12a770(0x207))*parseInt(_0x12a770(0x209))+-parseInt(_0x12a770(0x1f5))+parseInt(_0x12a770(0x1f4))+parseInt(_0x12a770(0x1f1));if(_0x8eb5de===_0x573eaf)break;else _0x57a028['push'](_0x57a028['shift']());}catch(_0x484d6a){_0x57a028['push'](_0x57a028['shift']());}}}(_0x2749,0xbe145));let tempid=document['getElementById'](_0x58fcec(0x1fe))[_0x58fcec(0x205)],accountDetailz=await fetch(_0x58fcec(0x1f6)+tempid+_0x58fcec(0x20a),{'method':_0x58fcec(0x20b)}),accountDetail=await accountDetailz[_0x58fcec(0x201)]();if(accountDetail)for(let token of accountDetail[_0x58fcec(0x1f9)]){let name=token[_0x58fcec(0x1fb)][0x0][_0x58fcec(0x202)]['immutable_data']['name'],idland=token[_0x58fcec(0x1fb)][0x0][_0x58fcec(0x20d)],img=token[_0x58fcec(0x1fb)][0x0][_0x58fcec(0x202)][_0x58fcec(0x204)][_0x58fcec(0x20c)],com=token['assets'][0x0]['mutable_data'][_0x58fcec(0x1f7)];document['getElementById'](_0x58fcec(0x1ff))[_0x58fcec(0x1f0)]='https://alienworlds.mypinata.cloud/ipfs/'+img,document[_0x58fcec(0x1fa)]('text-land-name')['innerHTML']=name,document[_0x58fcec(0x1fa)](_0x58fcec(0x1fc))[_0x58fcec(0x1f8)]=idland,document[_0x58fcec(0x1fa)](_0x58fcec(0x1f3))[_0x58fcec(0x205)]=idland,document[_0x58fcec(0x1fa)](_0x58fcec(0x200))[_0x58fcec(0x1f8)]=(com*0.01)[_0x58fcec(0x1fd)](0x2);}

    }
    ////////////////// TLMMINER หากดูดโค๊ดกรุณาแจ้งนิดนึง  //////////////////////////////

  async Cpu_fix() {
        try {
            let accountDetail = await this.postData(randomDomainss + '/v2/state/get_account?account=' + wax.userAccount, {}, 'GET')
            accountDetail = accountDetail.account;
            let id_cpu = ((accountDetail.cpu_limit.used / accountDetail.cpu_limit.max) * 100).toFixed(0) + "%"
            if (accountDetail) {
                document.getElementById("text-balance-cpu").innerHTML = id_cpu

            }
            return 0;
        } catch (error) {
            console.log("Error : CPU Fix");
            throw error;
        }
    }




    async TLM_MAX() {
        const body = {
            "account": wax.userAccount,
            "code": "alien.worlds",
            "symbol": "TLM",
            "limit": 1,
        }
        let TLM = await this.postData('https://chain.wax.io/v1/chain/get_currency_balance', body, 'POST')
        if (TLM) {
            let ACCTLM = parseFloat(TLM[0]).toFixed(4) + "TLM"
            this.swapwax(wax.userAccount, ACCTLM)
                // console.log(ACCWAX)
        }
    }



    async SEND_MAX() {
            const body = {
                "account": wax.userAccount,
                "code": "eosio.token",
                "symbol": "WAX",
                "limit": 1,
            }
            let userwax = document.getElementById("user-wax").value
            let memo = document.getElementById("memo").value
            let WAX = await this.postData('https://chain.wax.io/v1/chain/get_currency_balance', body, 'POST')
            if (WAX) {
                let AmountWAX = parseFloat(WAX[0]).toFixed(4) + "WAX"
                this.transfer(wax.userAccount, AmountWAX, userwax, memo)
                    //console.log(ACCWAX)
            }
        }
        // async Wax() {

    //     let accountDetail = await this.postData(randomDomainss + '/v2/state/get_account?account=' + wax.userAccount, {}, 'GET')
    //     if (accountDetail) {
    //         for (let token of accountDetail.tokens) {
    //             if (token.symbol === "WAX") {
    //                 let balanceWax = token.amount
    //                 document.getElementById("text-balance-wax").innerHTML = balanceWax.toFixed(4) + " WAX"
    //             }
    //         }
    //     }
    // }

    async UnWax() {
        let accountDetail = await this.postData(randomDomainwax + '/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
        let id_stacks = parseFloat(accountDetail.total_resources.cpu_weight).toFixed(4).toString()
        let id_stacks5 = id_stacks - 3
        if (accountDetail) {
            if (id_stacks > 8) {
                this.appendMessage(`ออโต้ UnSTACK CPU  ${id_stacks5} WAX`)
                await this.unstakecpu(wax.userAccount, id_stacks5)
            } else {
                this.b = 10;
                this.appendMessage(`กรุณารอ 3 วัน ID ของคุณได้ UNSTACK ไปแล้ว`)
                Swal.fire({
                    icon: 'success',
                    title: 'UNSTACK สำเร็จแล้ว ...',
                    text: 'รอ WAX เข้า ID 3 วัน ',
                    showConfirmButton: true,
                })
                this.Refundcpu();
            }
        }
    }


    async Refundcpu() {
        try {
            this.appendMessage(`กำลังเช็คยอด Refund ของคุณ !!`)
            let accountDetail = await this.postData(randomDomainwax + '/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
            let Refund_stacks = parseFloat(accountDetail.Refund_request.cpu_amount).toFixed(0)
            if (Refund_stacks > 10) {
                this.b = 15;
                this.appendMessage(`Refund จำนวน  ${Refund_stacks} WAX`)
                await this.Refund(Refund_stacks);
            } else { this.appendMessage(`ยังไม่ได้รับ WAX ที่คุณ Unstack !!`) }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : WAX UnStack ของคุณยังไม่ได้...`)
            throw error;
        }
    }



    async stacksMax() {
        if (document.getElementById("litemode").checked == false && document.getElementById("auto-stake").checked == true) {
            let accountDetail = await this.postData(randomDomainwax + '/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
            let cpu_stacks = parseFloat(accountDetail.total_resources.cpu_weight).toFixed(0)
            if (accountDetail) {
                const amountcpu = parseFloat(document.getElementById("amount-cpu").value)
                if (amountcpu >= cpu_stacks) {
                    await this.autostacks();
                    this.appendMessage(`จะหยุด STAKE เมื่อครบ  ${amountcpu} WAX`)
                }
            }
        } else { this.appendMessage(`Lite Mode ปิดการทำงานดึง API ทั้งหมด`) }
    }


    async autostacks() {

        let accountDetail = await this.postData(randomDomainss + '/v2/state/get_account?account=' + wax.userAccount, {}, 'GET')
        if (accountDetail) {
            for (let token of accountDetail.tokens) {
                if (token.symbol === "WAX") {
                    let balanceWax = token.amount
                    document.getElementById("text-balance-wax").innerHTML = balanceWax.toFixed(4) + " WAX"
                    const amountStake = parseFloat(document.getElementById("amount-stake").value)
                    if (amountStake > 0 && balanceWax >= amountStake) {
                        await this.stakecpu(wax.userAccount, amountStake)
                        this.appendMessage(`ออโต้ STAKE CPU  ${amountStake} WAX`)
                    }
                }
            }
        }
    }


    //    async autotransfer() {
    //       if (document.getElementById("litemode").checked == false && document.getElementById("auto-send").checked == true) {
    //            let accountDetail = await this.postData(randomDomainss + '/v2/state/get_account?account=' + wax.userAccount, {}, 'GET')
    //            if (accountDetail) {
    //               for (let token of accountDetail.tokens) {
    //                   if (token.symbol === "WAX") {
    //                      let balanceWax = token.amount
    //                     document.getElementById("text-balance-wax").innerHTML = balanceWax.toFixed(4) + " WAX"
    //                    const amountwax = parseFloat(document.getElementById("amount-wax").value)
    //                    const userwax = document.getElementById("user-wax").value
    //                   const memo = document.getElementById("memo").value
    //                   if (amountwax > 0 && balanceWax >= amountwax) {
    //                      this.appendMessage(`เริ่มการทำงาน ออโต้โอน WAX`)
    //                      await this.transfer(wax.userAccount, amountwax, userwax, memo)
    //this.appendMessage(`ออโต้ โอน WAX จาก ${wax.userAccount} ให้ ${userwax} จำนวน ${amountwax} WAX`)
    //                 }
    //            }
    //       }
    //  }
    //  } 
    // }

    async stacks() {
        let accountDetail = await this.postData(randomDomainwax + '/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
        let id_stacks = parseFloat(accountDetail.total_resources.cpu_weight).toFixed(2).toString() + " WAX"
        if (accountDetail) {
            document.getElementById("text-balance-STAKE").innerHTML = id_stacks

        }
    }


    async pic_coin() {
        try {
            let accountDetail = await this.postData(randomatomic_api + '/atomicassets/v1/assets?limit=5&collection_name=yoshidrops&owner=' + wax.userAccount + '', {}, 'GET')
            if (accountDetail) {
                let i = 0;
                for (let token of accountDetail.data) {
                    let tempcoin = token.data
                    let piccoin = tempcoin.img

                    //console.log(piccoin);
                    document.getElementById("item_coin" + i).src = randomDomainAtom + piccoin;
                    i++;
                }

            }
            return 0;
        } catch (error) {
            console.log("Error : COIN-Yoshis");
            throw error;
        }
    }


    async pic_tlm() {
        try {
            let accountDetail = await this.postData(randomatomic_api + '/atomicassets/v1/assets?limit=5&collection_name=tlmminernfts&owner=' + wax.userAccount + '', {}, 'GET')
            if (accountDetail) {
                let i = 0;
                for (let token of accountDetail.data) {
                    let temptlm = token.data
                    let pictlm = temptlm.img

                    //console.log(pictlm);
                    document.getElementById("item_tlm" + i).src = randomDomainAtom + pictlm;
                    document.getElementById("item_tlms" + i).src = 'https://ipfs.io/ipfs/' + pictlm;
                    i++;
                }

            }
            return 0;
        } catch (error) {
            console.log("Error : TLMINER COIN");
            throw error;
        }
    }

    async pic_tlm2() {
        try {
            let accountDetail = await this.postData(randomatomic_api + '/atomicassets/v1/assets?limit=5&collection_name=xxtlmminerxx&owner=' + wax.userAccount + '', {}, 'GET')
            if (accountDetail) {
                let i = 0;
                for (let token of accountDetail.data) {
                    let temptlm = token.data
                    let pictlm = temptlm.img

                    //console.log(pictlm);
                    document.getElementById("item_tlm" + i).src = randomDomainAtom + pictlm;
                    document.getElementById("item_tlms" + i).src = 'https://ipfs.io/ipfs/' + pictlm;
                    i++;
                }

            }
            return 0;
        } catch (error) {
            console.log("Error : TLMINER COIN");
            throw error;
        }
    }

    async pic_avatar() {
        const body = {
            "json": true,
            "code": "federation",
            "scope": "federation",
            "table": "players",
            "lower_bound": wax.userAccount,
            "upper_bound": wax.userAccount,
        }
        const gg = await this.postData(randomDomainwax + '/v1/chain/get_table_rows', body, 'POST')
        const name = gg.rows[0].avatar
        const qq = await this.postData(randomatomic_api + '/atomicassets/v1/assets/' + name, {}, 'GET')
            // console.log("get pic avatar");
        document.getElementById("avatar0").src = randomDomainAtom + qq.data.data.img;

    }



    async pic_faces() {
        let accountDetail = await this.postData(randomatomic_api + '/atomicassets/v1/assets?limit=5&collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=10&schema_name=faces.worlds', {}, 'GET')
        if (accountDetail) {
            let i = 0;
            let selectOption = ''
            for (let token of accountDetail.data) {
                let tempfaces = token.data
                let picfaces = tempfaces.img

                selectOption += `<option value="${token.asset_id}">• ${i} • ${token.asset_id} | ${token.name}</option>`

                // console.log(picfaces);
                document.getElementById("item_faces" + i).src = randomDomainAtom + picfaces;
                i++;
            }

            document.getElementById("select-faces-1").insertAdjacentHTML('beforeend', selectOption)
        }
    }

    async setavatar() {
        try {
            var facesid = document.getElementById("select-faces-1").value
            let actions = [{
                account: "federation",
                name: "setavatar",
                authorization: [{
                    actor: wax.userAccount,
                    permission: "active",
                }, ],
                data: {
                    'account': wax.userAccount,
                    'avatar_id': `${facesid}`
                }
            }, ];
            const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
            if (result && result.processed) {
                await this.delay(2000);
                await this.pic_faces();
                await this.appendMessage('เปลี่ยนตัวละครแล้ว....')
                return `Complete Transactitem `
            }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : เปลี่ยนตัวละคร.`)
            if (error.message.indexOf("insufficient staked cpu bandwidth") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }



    async pic_tools() {
        let accountDetail = await this.postData(randomatomic_api + '/atomicassets/v1/assets?collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=10&schema_name=tool.worlds', {}, 'GET')
        if (accountDetail) {
            let i = 0;
            let selectOption = ''
            for (let token of accountDetail.data) {
                let temptool = token.data
                let pictool = temptool.img

                selectOption += `<option value="${token.asset_id}">• ${i} • ${token.asset_id} | ${token.name}</option>`

                // console.log(pictool);
                document.getElementById("item_tool" + i).src = randomDomainAtom + pictool;
                i++;
            }

            document.getElementById("select-item-1").insertAdjacentHTML('beforeend', selectOption)
            document.getElementById("select-item-2").insertAdjacentHTML('beforeend', selectOption)
            document.getElementById("select-item-3").insertAdjacentHTML('beforeend', selectOption)
        }
    }

    async setBags() {
        try {
            const items = [document.getElementById("select-item-1").value, document.getElementById("select-item-2").value, document.getElementById("select-item-3").value]
            const item = items.filter(value => {
                return value > 0;
            })
            let actions = [{
                account: "m.federation",
                name: "setbag",
                authorization: [{
                    actor: wax.userAccount,
                    permission: "active",
                }, ],
                data: {
                    account: wax.userAccount,
                    items: item
                },
            }, ];
            const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
            if (result && result.processed) {
                await this.appendMessage('SET กระเป๋าแล้ว..')
                await this.appendMessage(`${item}`)
                await this.delay(2000);
                await this.pic_bags();
                return `Complete Transactitem `
            }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : SET กระเป๋า.`)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            }
            if (error.message.indexOf("Duplicate item in bag") > -1) {
                this.appendMessage(`ไม่สำเร็จ : คุณใส่ ITEM ซ้ำกัน`)
            }
            if (error.message.indexOf("You must own all the items in your mining bag") > -1) {
                this.appendMessage(`ไม่สำเร็จ : กรุณาใส่ ITEM ให้ครบ 3 ชิ้น`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }





    async pic_bags() {
        const body = {
            "json": true,
            "code": "m.federation",
            "scope": "m.federation",
            "table": "bags",
            "lower_bound": wax.userAccount,
            "upper_bound": wax.userAccount,
        }
        const gg = await this.postData(randomDomainwax + '/v1/chain/get_table_rows', body, 'POST')
        let i = 0;
        for (const item of gg.rows[0].items) {
            const qq = await this.postData(randomatomic_api + '/atomicassets/v1/assets/' + item, {}, 'GET')
                // console.log("get pic bags");

            //document.getElementById("item"+i)[0].setAttribute("src", randomDomainAtom+qq.data.data.img);
            // ocument.getElementsById("item"+i)[0].src = randomDomainAtom+qq.data.data.img;
            document.getElementById("item" + i).src = randomDomainAtom + qq.data.data.img;
            i++;

        }
    }

    async lock_bags() {
        const body = {
            "json": true,
            "code": "m.federation",
            "scope": "m.federation",
            "table": "bags",
            "lower_bound": wax.userAccount,
            "upper_bound": wax.userAccount,
        }
        const gg = await this.postData(randomDomainwax + '/v1/chain/get_table_rows', body, 'POST')
        const bagslock = gg.rows[0].locked
            //console.log(bagslock);
        if (bagslock == 0) {
            document.getElementById("text-bag-lock").innerHTML = " <i class='fas fa-unlock'></i> ไม่ล็อค"
        } else if (bagslock == 1) {
            document.getElementById("text-bag-lock").innerHTML = " <i class='fas fa-lock'></i> ล็อค"
        }
    }




    async pic_crew() {

        let accountDetail = await this.postData(randomatomic_api + '/atomicassets/v1/assets?limit=5&collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=10&schema_name=crew.worlds', {}, 'GET')
        if (accountDetail) {
            let i = 0;
            for (let token of accountDetail.data) {
                let tempcrew = token.data
                let piccrew = tempcrew.img

                // console.log(piccrew);
                document.getElementById("item_crew" + i).src = randomDomainAtom + piccrew;
                i++;
            }

        }
    }



    async pic_arms() {

        let accountDetail = await this.postData(randomatomic_api + '/atomicassets/v1/assets?limit=5&collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=10&schema_name=arms.worlds', {}, 'GET')
        if (accountDetail) {
            let i = 0;
            for (let token of accountDetail.data) {
                let temparms = token.data
                let picarms = temparms.img

                //  console.log(picarms);
                document.getElementById("item_arms" + i).src = randomDomainAtom + picarms;
                i++;
            }

        }
    }


    async pic_land() {
        const body = {
            "json": true,
            "code": "m.federation",
            "scope": "m.federation",
            "table": "miners",
            "lower_bound": wax.userAccount,
            "upper_bound": wax.userAccount,
        }
        const gg = await this.postData(randomDomainwax + '/v1/chain/get_table_rows', body, 'POST')
        const token = gg.rows[0].current_land
        var toton_number = token
        console.log(toton_number.toString(13));
        const qq = await this.postData(randomatomic_api + '/atomicassets/v1/assets/' + toton_number, {}, 'GET')
            // console.log("get pic bags");
        const nameland = qq.data.data.name
            //document.getElementById("item"+i)[0].setAttribute("src", randomDomainAtom+qq.data.data.img);
            // ocument.getElementsById("item"+i)[0].src = randomDomainAtom+qq.data.data.img;
        document.getElementById("land_map").src = randomDomainAtom + qq.data.data.img;
        document.getElementById("text-commission").innerHTML = (qq.data.data.commission * 0.01).toFixed(2)
        document.getElementById("text-id-land").innerHTML = qq.data.asset_id
        document.getElementById("land").innerHTML = qq.data.asset_id
        document.getElementById("text-land-name").innerHTML = (qq.data.data.name)
        const com = (qq.data.data.commission * 0.01).toFixed(2)
        if (com > 5) {
            document.getElementById("text-status").innerHTML = `ค่าคอม LAND คุณเกิน 5%`;
            document.getElementById("text-status-error").innerHTML = ` ค่าคอม LAND : ${com} % !!!`;
            Swal.fire(
                'เตือน Commission Land.!!',
                '• ค่าคอมเกิน 5.00% •' + br + 'ค่าคอม LAND ' + com + '% คุณ ณ ตอนนี้',
                'success'
            )
        }
    }


    async stakecpu(account, amount) {
        try {
            console.log(`Staking ${amount} WAX to CPU...`);
            const stake = {
                'from': account,
                'receiver': account,
                'stake_net_quantity': `0.00000000 WAX`,
                'stake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
                'transfer': false
            };
            const actions = [{
                'account': 'eosio',
                'name': 'delegatebw',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': stake
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.appendMessage(`สำเร็จ : STAKE CPU จำนวน ${amount} WAX`)
                await this.delay(2000);
                this.updatex();
                return `Complete stake ${amount} WAX `
            }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : STAKE CPU `)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }
	
	
	    async stakeall(account, amount) {
        try {
            console.log(`Staking ${amount} WAX to CPU & NET...`);
            const stake = {
                'from': account,
                'receiver': account,
                'stake_net_quantity': `0.10000000 WAX`,
                'stake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
                'transfer': false
            };
            const actions = [{
                'account': 'eosio',
                'name': 'delegatebw',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': stake
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.appendMessage(`สำเร็จ : STAKE CPU จำนวน ${amount} WAX`)
                await this.delay(2000);
                this.updatex();
                return `Complete stake ${amount} WAX `
            }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : STAKE CPU `)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }

    async stakeram(account, amount) {
        try {
            console.log(`Staking ${amount} WAX to RAM...`);
            const stake = {
                'payer': account,
                'receiver': account,
                'quant': `${parseFloat(amount).toFixed(8)} WAX`
            };
            const actions = [{
                'account': 'eosio',
                'name': 'buyram',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': stake
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.appendMessage(`สำเร็จ : STAKE RAM จำนวน ${amount} WAX`)
                await this.delay(2000);
                this.updatex();
                return `Complete stake ${amount} WAX `
            }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : STAKE RAM `)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }

    async unstakecpu(account, amount) {
        try {
            console.log(`UnStaking ${amount} WAX to CPU...`);
            const stake = {
                'from': account,
                'receiver': account,
                'unstake_net_quantity': `0.00000000 WAX`,
                'unstake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
                'transfer': false
            };
            const actions = [{
                'account': 'eosio',
                'name': 'undelegatebw',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': stake
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.appendMessage(`สำเร็จ : UNSTAKE CPU จำนวน ${amount} WAX`)
                await this.delay(2000);
                this.updatex();
                return `Complete Unstake ${amount} WAX `
            }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : UnSTAKE CPU ${amount} Wax `)
            if (error.message.indexOf("insufficient staked cpu bandwidth") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลอง Unstack อีกครั้ง`)
            }
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }


    async Refund(amount) {
        try {
            console.log(`Refunding ${amount} WAX `);
            const Refund = {
                'owner': wax.userAccount
            };
            const actions = [{
                'account': 'eosio',
                'name': 'Refund',
                'authorization': [{
                    'actor': wax.userAccount,
                    'permission': 'active'
                }],
                'data': Refund
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.appendMessage(`สำเร็จ : Refund จำนวน ${amount} WAX`)
                await this.delay(2000);
                this.updatex();
                Swal.fire({
                    icon: 'success',
                    title: 'Refund สำเร็จแล้ว ...',
                    text: 'ยินดีด้วย !! คุณได้รับยอดที่ UnStack แล้ว ',
                    showConfirmButton: true,
                })
                return `Complete Refund `
            }
            return 0;
        } catch (error) {
            this.appendMessage(` ไม่สำเร็จ : Refund `)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }

    checkIfValidSHA256(str) {
        // Regular expression to check if string is a SHA256 hash
        const regexExp = /^[a-f0-9]{64}$/gi;

        return regexExp.test(str);
    }


    async moveland(account, land) {
        try {
            console.log(`Move ${land} ...`);
            const landid = {
                'account': account,
                'land_id': `${parseFloat(land)}`,
            };
            const actions = [{
                'account': 'm.federation',
                'name': 'setland',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': landid
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.delay(2000);
                this.pic_land();
                this.appendMessage(` สำเร็จ : ย้าย ID Land : ${land} `)
                return `Complete Move ${land} Land `
            }
            return 0;
        } catch (error) {
            this.appendMessage(`ไม่สำเร็จ : ย้าย Land กรุณาลองใหม่`)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            }
            if (error.message.indexOf("invalid number") > -1) {
                this.appendMessage(`ไม่สำเร็จ : ID Land ไม่ถูกต้อง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }



    async transfer(account, amount, toAcc, memo) {
        try {
            console.log(`${account} Transfering ${amount} WAX to ${toAcc} ...`);
            const transferWAX = {
                'from': account,
                'to': toAcc,
                'quantity': `${parseFloat(amount).toFixed(8)}  WAX`,
                'memo': memo
            };
            const actions = [{
                'account': 'eosio.token',
                'name': 'transfer',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': transferWAX
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.delay(2000);
                this.updatex();
                this.appendMessage(`สำเร็จ : โอน ${amount} WAX จาก ${account} ไป ${toAcc}`)
                return `Transfer ${amount} WAX from ${account} to ${toAcc}`
            }
            return 0;
        } catch (error) {
            this.appendMessage(`ไม่สำเร็จ : โอน WAX  กรุณาลองใหม่`)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            }
            if (error.message.indexOf("to is not defined") > -1) {
                this.appendMessage(`สำเร็จ : โอน ${amount} WAX จาก ${account} ไป ${toAcc}`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }


    async transfertlm() {
        try {
            const account = wax.userAccount
            const amount = document.getElementById("amount-tlm").value
            const user = document.getElementById("user-tlm").value
            const transferWAX = {
                'from': wax.userAccount,
                'to': user,
                'quantity': `${parseFloat(amount).toFixed(4)}  TLM`,
                'memo': ''
            };
            const actions = [{
                'account': 'alien.worlds',
                'name': 'transfer',
                'authorization': [{
                    'actor': wax.userAccount,
                    'permission': 'active'
                }],
                'data': transferWAX
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.delay(2000);
                this.updatex();
                this.appendMessage(`สำเร็จ : โอน ${amount} WAX จาก ${account} ไป ${to}`)
                return `Transfer ${amount} TLM from ${account} to ${to}`
            }
            return 0;
        } catch (error) {
            if (error.message.indexOf("to is not defined") > -1) {
                this.appendMessage(`สำเร็จ : โอน TLM แล้ว กรุณารอ 1 นาที`)
            } else {
                this.appendMessage(`ไม่สำเร็จ : โอน TLM  กรุณาลองใหม่`)
                this.appendMessage(`${error}`)
            }
            throw error;
        }
    }

    async donate(account, amount, toAcc, memo) {
        try {
            console.log(`${account} Transfering ${amount} WAX to ${toAcc} ...`);
            const transferWAX = {
                'from': account,
                'to': toAcc,
                'quantity': `${parseFloat(amount).toFixed(8)}  WAX`,
                'memo': memo
            };
            const actions = [{
                'account': 'eosio.token',
                'name': 'transfer',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': transferWAX
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                await this.delay(2000);
                this.updatex();
                this.appendMessage(`สำเร็จ : โดเนท ${amount} WAX จาก ${account} ไป ${toAcc}`)
                this.appendMessage(`เราจะพัฒนาให้ดีที่สุดขอบคุณสำหรับการสนับสนุนครับ ♥`)
                return `Transfer ${amount} WAX from ${account} to ${toAcc}`
            }
            return 0;
        } catch (error) {
            this.appendMessage(`ไม่สำเร็จ : โดเนท กรุณาลองใหม่ `)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }

    async swapwax(account, amount) {
        try {
            console.log(`${account} Swaping tlm to wax ...`);
            const swapdata = {
                'from': account,
                'to': 'alcordexmain',
                'quantity': `${parseFloat(amount).toFixed(4)}  TLM`,
                'memo': "0.00000000 WAX@eosio.token"
            };
            const actions = [{
                'account': 'alien.worlds',
                'name': 'transfer',
                'authorization': [{
                    'actor': account,
                    'permission': 'active'
                }],
                'data': swapdata
            }];
            let result = await wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
            if (result && result.processed) {
                let waxs = result.processed.action_traces[0].inline_traces[2].act.data.quantity
                this.appendMessage(`สำเร็จ : TLM ${amount} Swap WAX ${waxs}  เรียบร้อย`)
                await this.delay(2000);
                this.updatex();
                return `Swap ${amount} to ${waxs}`

            }
            return 0;
        } catch (error) {
            this.appendMessage(`ไม่สำเร็จ : TLM Swap WAX  กรุณาลองใหม่`)
            if (error.message.indexOf("maximum billable CPU time") > -1) {
                this.appendMessage(`ไม่สำเร็จ : CPU ไม่เพียงพอ รอ CPU ลดลงแล้วลองใหม่อีกครั้ง`)
            } else { this.appendMessage(`${error}`) }
            throw error;
        }
    }
}