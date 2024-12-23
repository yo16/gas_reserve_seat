/*
    OneShotReserve
    １つの時間枠の予約選択
*/

import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Paper from "@mui/material/Paper"
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import ChairAltIcon from '@mui/icons-material/ChairAlt';


interface OneShotReserve {
    title: string,
    num_of_reseaved_seat: number;
    num_of_reseavable: number;
    onChangeSelect: (indexes: number[]) => void;
};
export const OneShotReserve = ({
    title,
    num_of_reseaved_seat,
    num_of_reseavable,
    onChangeSelect,
}: OneShotReserve) => {
    // 選ばれた順に、indexを入れる配列
    // 選ばれていない場合は-1
    const [ reservedSeatIndexes, setReservedSeatIndexes ] = useState<number[]>(
        Array.from({length: num_of_reseavable}).map((_) => -1)
    );

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // 選択されたときのハンドル
    const handleChangedSelected = (selected: boolean, index: number) => {
        // 最終的にこの値に更新する
        let nextReserved = [];

        if (selected) {
            // 選択する場合
            // 追加前にいっぱいかどうか
            // いっぱいの場合は1、空(-1)の場合は0
            const isFilled = (reservedSeatIndexes[num_of_reseavable-1] < 0)? 0: 1;

            // num_of_reseavable+1の配列に、後入れで入れる
            nextReserved = [...reservedSeatIndexes, index]
                .filter((n) => n !== -1)
                .concat(new Array(num_of_reseavable).fill(-1))
                .slice(isFilled, num_of_reseavable + isFilled)
            ;

        } else {
            // 選択を除外する場合
            nextReserved = [...reservedSeatIndexes]
                .filter((n) => n !== index)
                .concat(new Array(num_of_reseavable).fill(-1))
                .slice(0, num_of_reseavable)
            ;

        }
        setReservedSeatIndexes([...nextReserved]);

        // -1以外の要素だけにして、上位へ報告
        onChangeSelect([...nextReserved].filter((e) => e !== -1));
    };

    return (
        <Paper
            elevation={3}
            sx={{
                margin: "15px",
                padding: isMobile? "10px": "20px",
            }}
        >
            <Typography
                variant="h6"
            >
                {title}
            </Typography>

            <Box
                sx={{
                    width: 320,
                    borderRadius: 1,
                    bgcolor: '#eea',
                }}
            >
                <Typography
                    align={"center"}
                    noWrap={true}
                    sx={{
                        padding: isMobile? "15px": "20px",
                    }}
                >
                    アクティングスペース
                </Typography>
                <Divider />
                <Typography
                    align={"center"}
                    noWrap={true}
                >
                    ／／／／／ 桟敷席 ／／／／／
                </Typography>
                <Box
                    sx={{
                        textAlign: "center"
                    }}
                >
                    <NonReservedSeat />
                    {Array.from({length: num_of_reseaved_seat}).map((_, i) => (
                        <ReservedSeat
                            key={`rs_${i}`}
                            selected={reservedSeatIndexes.includes(i)}
                            onChange={(selected) => handleChangedSelected(selected, i)}
                        />
                    ))}
                    <NonReservedSeat />
                </Box>
                {Array.from({ length: 2 }).map((_, row) => (
                    <Box
                        key={`box_${row}`}
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        {Array.from({ length: 12 }).map((_, col) => (
                            <NonReservedSeat
                                key={`left_${col}`}
                            />
                        ))}
                    </Box>
                ))}
                <Box
                    sx={{
                        textAlign: "center"
                    }}
                >
                    ・・・・・ 立見席 ・・・・・
                </Box>
            </Box>
        </Paper>
    );
}


interface ReservedSeatProps {
    selected: boolean;
    onChange: (selected: boolean) => void;
}
const ReservedSeat = ({
    selected,
    onChange,
}: ReservedSeatProps) => {
    const handleClick = () => {
        onChange(!selected);
    };

    return (
        <IconButton
            color="primary"
            size="small"
            sx={{
                padding: 0,
                backgroundColor: selected? "#f00": "#fff",
                border: "1px solid #999",
            }}
            onClick={handleClick}
        >
            <ChairAltIcon />
        </IconButton>
    );
};
const NonReservedSeat = () => {
    return (
        <IconButton
            color="secondary"
            disabled
            sx={{
                padding: "1px",
            }}
        >
            <ChairAltIcon />
        </IconButton>
    );
};
