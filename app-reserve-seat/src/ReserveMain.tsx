/*
    ReserveMain
    席の選択と、予約実行画面
*/

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { OneShotReserve } from "./OneShotReserve";

const RESERVE_MASTER = [
    {name: "第１部", startDt: "10:30", endDt: "12:10"},
    {name: "第２部", startDt: "12:30", endDt: "14:15"},
    {name: "第３部", startDt: "14:40", endDt: "16:00"},
];
// 予約の選択肢の数
const NUMBER_OF_RESEARVED_SEATS = 10;
// 選ぶことができるシート数
const NUMBER_OF_RESEARVABLE = 2;

export const ReserveMain = () => {
    const [ formData, setFormData ] = useState<{name: string, email: string, reserve: string}>({
        name: "",
        email: "",
        reserve: "",
    });
    // 部ごとの選択テキスト
    const [ selectedSeatTexts, setSelectedSeatTexts ] = useState<string[]>(
        Array.from({length: RESERVE_MASTER.length}).map(() => "")
    );
    useEffect(() => {
        const validElms = selectedSeatTexts.filter(e => e !== "");
        setFormData({
            ...formData,
            reserve: validElms.join("、"),
        });
    }, [selectedSeatTexts]);

    const handleOnChangedReserve = (seatIndexes: number[], timeIndex: number) => {
        // 選択された情報から、予約した内容の文字列へ変更
        const reservedSeats = seatIndexes.map((i) => i+1).join(",");
        const reservedText = (seatIndexes.length===0)? ""
            : `${RESERVE_MASTER[timeIndex].name}.${reservedSeats}`;

        const nextTexts = [...selectedSeatTexts];
        nextTexts[timeIndex] = reservedText;
        setSelectedSeatTexts(nextTexts);
    };
    const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 登録する
    // 実際に"submit"するとページがリロードされてめんどくさいので、
    // submitだと思って関数を実行する
    //const handleSubmit = (e: React.FormEvent) => {
    //    e.preventDefault();
    const handleSubmit = () => {
        /*
        const postData =  async () => {
            const deployId = PropertiesService.getScriptProperties().getProperty("DEPLOY_ID");
            const response = await fetch(
                `https://script.google.com/macros/s/${deployId}/exec`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData
                    })
                }
            );
            if (!response.ok) {
                console.error("Post process error");
                console.log(response);
                return;
            }
            const result = await response.json();
            console.log("登録しました😊", result);
        };

        postData();
        */
        google.script.run
            .withSuccessHandler((result: any) => {
                console.log("登録しました😊", result);
            })
            .registData(formData);
    }

    return (
        <>
            <Typography
                variant="h4"
            >
                優先観覧席のご予約について
            </Typography>
            <Typography
            >
                <ul>
                    <li>観覧席の最前列の中央寄りの10席を、有料の優先観覧席といたします。</li>
                    <li>代金は、部ごとに１席あたり1,000円です。（例えば、同じ席でも１部～３部を通しですと3,000円）</li>
                    <li>お支払いは、当日現金払いでお願いします。</li>
                    <li>開始時刻になってもいらっしゃらない場合は、キャンセルとご判断いたします。遅れていらっしゃる場合はご連絡ください。</li>
                    <li>最前列は演者との距離が近く、一体感を楽しめる特別な席です。ご予約いただく際は、責任をもってお越しいただける方に限らせていただきます。</li>
                </ul>
            </Typography>
            
            <Typography
                variant="h4"
            >
                ご予約方法
            </Typography>
            <Typography
            >
                1. 予約したい時間の位置（イスのアイコン）をクリックしてください。
            </Typography>
            <Typography
            >
                2. 画面下部で、必要項目を入力し、予約ボタンを押してください。
            </Typography>
            <Typography
            >
                3. 確認メールが届きます。
            </Typography>
            {RESERVE_MASTER.map((r, i) => (
                <OneShotReserve
                    key={`osr_${i}`}
                    title={`【第${i+1}部】 ${r.startDt}～${r.endDt}`}
                    num_of_reseaved_seat={NUMBER_OF_RESEARVED_SEATS}
                    num_of_reseavable={NUMBER_OF_RESEARVABLE}
                    onChangeSelect={(seatIndexes) => handleOnChangedReserve(seatIndexes, i)}
                />
            ))}

            <form onSubmit={handleSubmit}>
                <TextField
                    id="reserved-seat"
                    label="ご予約する席"
                    variant="outlined"
                    required={true}
                    value={formData.reserve}
                    sx={{
                        width: "300px",
                    }}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
                <TextField
                    id="name"
                    name="name"
                    label="お名前"
                    variant="outlined"
                    required={true}
                    value={formData.name}
                    onChange={handleChangeTextField}
                />
                <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="メールアドレス"
                    variant="outlined"
                    required={true}
                    value={formData.email}
                    onChange={handleChangeTextField}
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >予約登録</Button>
            </form>
        </>
    );
};
