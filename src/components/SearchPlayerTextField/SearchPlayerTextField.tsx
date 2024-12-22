import { TextField } from "@mui/material";


interface SearchPlayerTextFieldProps {
    onChange: (value: string) => void
    searchedUsername : string | undefined

}
const SearchPlayerTextField = (props:SearchPlayerTextFieldProps) => {
    const {onChange, searchedUsername} = props;
    return <>
        <TextField
            onChange={(e) => {
                onChange(e.target.value)
            }}
            id="search-user"
            value={searchedUsername ?? ""}
            placeholder="Search for a player by username"
            sx={{width: "24em"}}
        />
    </>

}

export default SearchPlayerTextField;