import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckboxLabel from "../../UIComponents/MultiSelectDropdown/label";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

interface TypeProps {
  items: string[] | any;
  placeholder: string;
  onChange: Function;
  searchBar?: boolean;
  heightItemsContainer?: string;
  SelectedData?: string[] | any;
  Label?: string;
  className?:string
  disabled?:any;
}

interface TypeOpt {
  opt: string;
  checked: boolean;
  id?: any;
}

const Inputsearch = styled("input")(() => {
  return {
    backgroundColor: "transparent",
    width: "100%",
    border: "0",
    fontSize: "16px",
    color: "black",
  };
});

export default function SelectCheckBoxSimple({
  items,
  placeholder,
  onChange,
  searchBar,
  heightItemsContainer,
  Label,
  SelectedData,
  disabled,
  className
}: TypeProps) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [opts, setOpts] = useState<any[]>([]);
  const [optsSelected, setOptsSelected] = useState<TypeOpt[]>([]);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [addCustomeOption, setAddCustomeOption] = useState(false);
  const [customeField, setCustomeField] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newArray: any = items?.map((opt: any) => ({ opt, checked: false }));
    setOpts(newArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(()=>{
if(addCustomeOption == false){
  setCustomeField("")
}
  },[addCustomeOption])

  useEffect(() => {
    if(selectRef)
    {
        window.addEventListener('click', (e) => {
            if(selectRef.current)
            {
                if(!selectRef.current.contains((e.target as Element)))
                {
                    setShowDropDown(false)
                }
            }
        })
    }
  }, [])

useEffect(() => {
  setAddCustomeOption(false)
  setCustomeField("")
  if(showDropDown)
  {
      ref.current?.classList.remove('hidden')
      setTimeout(() => {
          ref.current?.classList.remove('opacity-0')
          ref.current?.classList.remove('-translate-y-5')
      }, 200);
  }
  else
  {
      ref.current?.classList.add('opacity-0')
      ref.current?.classList.add('-translate-y-5')
      setTimeout(() => {
          ref.current?.classList.add('hidden')
      }, 200);
  }
}, [showDropDown])

  useEffect(() => {
    let empty: any = [];
    const selected = optsSelected?.map((opt) => opt);
    if (optsSelected?.length > 0) {
      onChange(selected);
    } else {
      onChange(empty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optsSelected]);

  const FetchData = (opts: any, optsSelected: any) => {
    var Arr: any = [];
    var result1 = opts?.filter((original: any) => {
      return optsSelected?.some((selected: any) => {
        if (
          original?.opt?.name === selected?.opt &&
          original?.checked == false
        ) {
          original.checked = true;
          // Arr.push({ opt: original?.opt?.name, checked: true });
        }
      });
    });
  };

  useEffect(() => {
    FetchData(opts, optsSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts, optsSelected]);

  const inputSearch = React.useRef<HTMLInputElement>(null);

  const focusInputSearch = () => inputSearch?.current?.focus();

  const handleAddLabel = (e: React.MouseEvent<HTMLInputElement>) => {
    setAddCustomeOption(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optName = e.target.name;
    const optChecked = e.target.checked;
    const optId = e.target.id;

    const newArray = opts.map((opt) =>
      optName === opt.opt ? { ...opt, checked: optChecked, id: optId } : opt
    );
    setOpts(newArray);

    if (optChecked) {
      setOptsSelected([
        ...optsSelected,
        { opt: optName, checked: optChecked, id: optId },
      ]);
    } else {
      const arr = optsSelected
        .map((opt) =>
          optName == opt?.opt
            ? { ...opt, checked: optChecked, id: optId }
            : opt
        )
        .filter((opt) => opt.checked && opt);

      const newArray = opts?.map((opt) => ({ ...opt, checked: optChecked }));
      setOpts(newArray);
      setOptsSelected(arr);
    }
  };

  const clearOne = (optToDelete: string) => {
    const newArray = opts.map((opt) =>
      optToDelete === opt.opt ? { ...opt, checked: false } : opt
    );
    setOpts(newArray);
    const arr = optsSelected
      .map((opt) =>
        optToDelete === opt.opt ? { ...opt, checked: false } : opt
      )
      .filter((opt) => opt.checked && opt);

    const newArray2 = opts?.map((opt) => ({ ...opt, checked: false }));
    setOpts(newArray2);
    setOptsSelected(arr);
    setOptsSelected(arr);
  };

  const clearAll = () => {
    setOptsSelected([]);
    const newArray = opts?.map((opt) => ({ ...opt, checked: false }));
    setOpts(newArray);
  };
  const filtered = opts?.filter(({ opt }) => {
    return opt?.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const AddField = () => {
    let optionAdd: any = opts;
    if (customeField !== "") {
      optionAdd.unshift({ checked: true, opt: { name: customeField, id: "" } });
    }
    setOpts([...optionAdd]);
    setOptsSelected([
      ...optsSelected,
      { opt: customeField, checked: true, id: "" },
    ]);
    setCustomeField("");
    setAddCustomeOption(false);
  };
  return (
    <Box ref={selectRef} className={`relative sm:my-2 my-5 ${className}`}>
      <div className="absolute top-[-0.5rem] left-0 w-full flex justify-center items-center">
            <label className="px-[5px] text-[11px] uppercase letter-spacing"
            style={{background: "linear-gradient(360deg, #fff, #fff, #fff, transparent, transparent)"}}
            >{Label}</label>
            </div>
      <Box className="flex items-center border border-[#C9D2DD] h-[100px] w-full bg-white rounded-2xl py-4 px-2">
      <Box
        className="flex items-center justify-between w-full overflow-hidden cursor-pointer"
      >
        <Box
        className="overflow-hidden pt-4 pb-2 h-[100px]"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          onClick={()=>{
          setShowDropDown(true)
        }}
        >
          <Box
            // display="flex"
            // alignItems="center"
            className="flex flex-wrap gap-1 h-full w-full mr-2"
            sx={{
              overflowY: "scroll",
              overflowX: "hidden",
              // "::-webkit-scrollbar": {
              //   // display: "none",
              // },
              scrollbarWidth: "none",
            }}
          >
            {optsSelected?.length > 0 &&
              optsSelected?.map(( opt , index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-500 px-2 flex items-center justify-between h-[20px]"
                  >
                    {Label !== "Occasion" &&(
                      <Typography
                      className="mr-2"
                        color="common.white"
                        fontSize="10px"
                        fontWeight="400"
                      >
                        {opt.id}.
                      </Typography>
                    )}
                    <Typography
                    className="text-center"
                      color="common.white"
                      fontSize="10px"
                      fontWeight="400"
                    >
                      {opt?.opt}
                    </Typography>
                    <img
                      className="cursor-pointer w-[10px] h-[10px] ml-3"
                      src="/images/icons/close-white-icon.svg"
                      alt=""
                      onClick={() => clearOne(opt?.opt)}
                    />
                  </div>
                );
              })}
            {!optsSelected?.length && (
              <Typography color="#999999">{placeholder}</Typography>
            )}
          </Box>
          {/* {optsSelected?.length > 0 && (
            <Box className="flex items-center mx-2">
              <Box className="py-1 px-2 flex justify-center items-center rounded-md bg-[#4B9AD4] text-white">
                <Typography
                  fontSize="10px"
                  fontWeight="400px"
                  color="common.white"
                >
                  {optsSelected.length}
                </Typography>
              </Box>
            </Box>
          )} */}
        </Box>
      </Box>
      <Box
        className="flex justify-center items-center cursor-pointer"
        onClick={()=>{
          setShowDropDown(!showDropDown)
          setSearch("")
        }
      }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Box>
      </Box>

      {/* Dropdown list */}
      <Box
      ref={ref}
      className="sm:w-[400px] w-[250px] overflow-x-hidden rounded-xl large-shadow hidden opacity-0 -translate-y-5 transition-all duration-300"
        position="absolute"
        left="0"
        right="0"
        bgcolor="common.white"
        zIndex="3"
      >
        <Box className="relative">
        {disabled && optsSelected.length >= 10 && (
          <Box className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-25 z-10"></Box>
        )}
        {searchBar && addCustomeOption === false && (
          <Box
            borderBottom="1px dashed #E5E5E5"
            pl="20px"
            pr="10px"
            className="flex bg-[rgb(239,242,247)] justify-between items-center h-[39px]"
            onClick={focusInputSearch}
          >
            <Box width="100%" mr="10px">
              <Inputsearch
                onChange={(e: any) => setSearch(e.target.value)}
                style={{ outline: "none" }}
                ref={inputSearch}
                placeholder="Search"
              />
            </Box>
            <Box>
              <img src="/images/icons/search-input-icon.svg" alt="" />
            </Box>
          </Box>
        )}

        <Box
          borderBottom="1px dashed #E5E5E5"
          display={!addCustomeOption? "none" : "flex"}
          pl="20px"
          pr="10px"
          className="bg-[rgb(239,242,247)] justify-between items-center h-[39px]"
          onClick={focusInputSearch}
        >
          <Box width="100%" mr="10px">
            <Inputsearch
              onChange={(e: any) => setCustomeField(e.target.value)}
              style={{ outline: "none" }}
              placeholder="Add Occassion"
            />
          </Box>
          <Box className="flex items-center text-[20px]">
            <AiFillCheckCircle
              className="text-green-700 cursor-pointer mr-1"
              onClick={AddField}
            />
            <AiFillCloseCircle
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setAddCustomeOption(false);
                setCustomeField("");
              }}
            />
          </Box>
        </Box>

        <Box
          height={heightItemsContainer}
          py="10px"
          sx={{ overflowY: "auto" }}
        >
          <span
            className={`flex items-center gap-x-3 pb-3 px-6 cursor-pointer select-none ${addCustomeOption ? "hidden" : ""}`}
            onClick = {handleAddLabel}
          >
            <span
              className="flex justify-center items-center w-[20px] h-[20px] rounded-full bg-[#4B9AD4] text-white "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </span>
            <p className="text-[#4B9AD4] text-[14px]">Add {Label}</p>
          </span>
          {filtered?.map(({ opt, checked }, index) => {
            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                py="5px"
                pl="20px"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "grey.200",
                  },
                }}
              >
                {Label !== "Occasion" && (
                <span className="text-[#9e9e9e] mr-2">{opt?.id}.</span>
                )}
                <CheckboxLabel
                  label={opt?.name}
                  onChange={handleChange}
                  name={opt?.name}
                  id={opt?.id}
                  checked={checked}
                  marginLabel="7px"
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      </Box>
    </Box>
  );
}