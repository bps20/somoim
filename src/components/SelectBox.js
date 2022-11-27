import React from "react";
// option들을 정의

const SelectBox = () => {
    const options = [
        { value: "apple", name: "사과" },
        { value: "banana", name: "바나나" },
        { value: "orange", name: "오렌지" },
    ];

	return (
		<select>
			{options.map((option) => (
				<option value={option.value} defaultValue={"banana"}>
					{option.name}
				</option>
			))}
		</select>
	);
};
//<SelectBox options={OPTIONS} defaultValue="banana"></SelectBox>

export default SelectBox;