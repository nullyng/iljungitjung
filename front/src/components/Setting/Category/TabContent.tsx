import {
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { ThemeProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";

import styles from "@styles/Setting/TabContent.module.scss";
import CustomButton from "@components/common/CustomButton";
import theme from "@components/common/theme";
import { SettingCategoryState } from "@components/types/types";
import { addCategory, editCategory, selectCategory } from "@modules/setting";
import { RootState } from "@modules/index";

const hours = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const colorList = [
  "#D5EAEF",
  "#FFC4C2",
  "#C3DBE3",
  "#F0F4C4",
  "#D7CBF4",
  "#F4F38A",
  "#F6D9C8",
  "#DEFFBC",
  "#D0E3CC",
  "#D7DFFF",
  "#FDEEC6",
  "#E8D5D5",
  "#ECF2DF",
  "#D5ECE4",
  "#FFE3F4",
  "#D8DFF1",
];

interface TabContentProps {
  flag: boolean;
}

const TabContent = ({ flag }: TabContentProps) => {
  const categories = useSelector(
    (state: RootState) => state.setting.categories
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.setting.selectedCategory
  );

  const dispatch = useDispatch();
  const onAddCategory = (category: SettingCategoryState) =>
    dispatch(addCategory(category));
  const onEditCategory = (category: SettingCategoryState) =>
    dispatch(editCategory(category));
  const onSelectCategory = (category: SettingCategoryState) =>
    dispatch(selectCategory(category));

  const [add, setAdd] = useState({
    name: "",
    hour: "1",
    min: "00",
    color: "#D5EAEF",
  });
  const [edit, setEdit] = useState({ name: "", hour: "", min: "", color: "" });
  const [snackbar, setSnackbar] = useState(false);
  const [overSnackbar, setOverSnackbar] = useState(false);

  const init = { categoryName: "", time: "", color: "#D5EAEF" };

  useEffect(() => {
    let hour, min;
    const time = selectedCategory.time;
    if (time.substring(0, 1) === "0") {
      hour = time.substring(1, 2);
      min = time.substring(2);
    } else {
      hour = time.substring(0, 1);
      min = time.substring(1);
    }

    setEdit({
      name: selectedCategory.categoryName,
      hour: hour,
      min: min,
      color: selectedCategory.color,
    });
  }, [selectedCategory]);

  const handleSubmitForm = () => {
    // flag??? false??? ?????? ??????, true??? ?????? ??????
    if (!flag) {
      if (categories.length === 15) {
        setOverSnackbar(true);
        return;
      }

      if (add.name.length > 0) {
        onAddCategory({
          categoryName: add.name,
          time: (add.hour.length === 1 ? "0" + add.hour : add.hour) + add.min,
          color: add.color,
        });
        setAdd({ name: "", hour: "1", min: "00", color: "#D5EAEF" });
      } else {
        setSnackbar(true);
      }
    } else {
      if (edit.name.length > 0) {
        onEditCategory({
          categoryName: edit.name,
          time:
            (edit.hour.length === 1 ? "0" + edit.hour : edit.hour) + edit.min,
          color: edit.color,
        });
        onSelectCategory(init);
      } else {
        setSnackbar(true);
      }
    }
  };

  return (
    <div className={styles["tab-content"]}>
      {flag && selectedCategory.categoryName === "" ? (
        <div className={styles["no-selected-category"]}>
          ????????? ??????????????? ????????? ?????????.
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <div className={styles["category-name"]}>
            <h3>???????????????</h3>
            <TextField
              FormHelperTextProps={{ className: styles["helper-text"] }}
              size="small"
              variant="standard"
              placeholder="?????????????????? ??????????????????."
              inputProps={{ maxLength: 15 }}
              fullWidth
              value={!flag ? add.name : edit.name}
              onChange={(e) => {
                if (!flag) {
                  setAdd({ ...add, name: e.target.value });
                } else {
                  setEdit({ ...edit, name: e.target.value });
                }
              }}
              helperText={
                !flag ? `${add.name.length} / 15` : `${edit.name.length} / 15`
              }
            />
          </div>
          <Snackbar
            open={snackbar}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={() => setSnackbar(false)}
            message="???????????? ????????? ????????? ?????????."
          />
          <Snackbar
            open={overSnackbar}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={() => setOverSnackbar(false)}
            message="??????????????? ?????? 15????????? ?????? ???????????????."
          />
          <div className={styles["time-taken"]}>
            <div className={styles.title}>
              <h3>????????????</h3>
              <span>* 30??? ????????? ??????</span>
            </div>
            <div className={styles.dropdown}>
              <FormControl className={styles.hour} size="small">
                <Select
                  label=""
                  className={styles.select}
                  value={!flag ? add.hour : edit.hour}
                  onChange={(e) => {
                    if (!flag) {
                      setAdd({ ...add, hour: e.target.value });
                    } else {
                      setEdit({ ...edit, hour: e.target.value });
                    }
                  }}
                >
                  {hours.map((hour, index) => (
                    <MenuItem key={index} value={hour}>
                      {hour}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <span>??????</span>
              <FormControl className={styles.min} size="small">
                <Select
                  className={styles.select}
                  value={!flag ? add.min : edit.min}
                  onChange={(e) => {
                    if (!flag) {
                      setAdd({ ...add, min: e.target.value });
                    } else {
                      setEdit({ ...edit, min: e.target.value });
                    }
                  }}
                >
                  <MenuItem value={"00"}>00</MenuItem>
                  <MenuItem value={"30"}>30</MenuItem>
                </Select>
              </FormControl>
              <span>???</span>
            </div>
          </div>
          <div className={styles["category-color"]}>
            <h3>???????????? ??????</h3>
            <CirclePicker
              className={styles["color-picker"]}
              colors={colorList}
              color={!flag ? add.color : edit.color}
              onChange={(color) => {
                if (!flag) {
                  setAdd({ ...add, color: color.hex });
                } else {
                  setEdit({ ...edit, color: color.hex });
                }
              }}
            />
          </div>
          <div className={styles["submit-button"]}>
            <CustomButton children="??????" onClick={handleSubmitForm} />
          </div>
        </ThemeProvider>
      )}
    </div>
  );
};

export default TabContent;
