import React, {useState} from 'react'
// import BrandOptionButton from './BrandOptionButton'



export default function BrandOptions({ filterProducts }){
  const [brandOptions , setBrandOptions] = useState([
  { brandID: 'all', isSelected:true },
  { brandID: 'samsung', isSelected:false },
 { brandID: 'apple', isSelected:false},
 { brandID: 'google', isSelected:false},
 { brandID: 'sony', isSelected:false},
 { brandID: 'oneplus', isSelected:false },
])

 function handleCheckboxChange (id , isSelected){
    const updatedBrandOptions = brandOptions.map((brand) => {
      if (brand.brandID === id) {
        filterProducts(brand.brandID)
        return { ...brand, isSelected: true };
      } else {
        return { ...brand, isSelected: false };
      }
    });

    // Update state with the new brand options
    setBrandOptions(updatedBrandOptions);
  };
  return (
    <div className='flex gap-4 py-2 w-full overflow-x-auto px-4 hide-scrollbar '>
      {
        brandOptions.map((brand,index) => (<BrandOptionButton key={index} brandID={brand.brandID} isSelected={brand.isSelected} handleCheckboxChange={handleCheckboxChange}/>))
      }
        
    </div>
  )
}


const BrandOptionButton = ({ brandID , isSelected , handleCheckboxChange }) => {
  // const [isSelected, setIsSelected] = useState(false);

  return (
    <div id="brand-option" className={`rounded-2xl px-3 py-1  capitalize text-xl ${isSelected ? "border-[#695acde4] border text-[#695acde4] bg-white font-semibold" : 'border bg-[#695acde4] text-white  border-white'}`} onClick={() => handleCheckboxChange(brandID , isSelected)}>
        {brandID}
    </div>
  )
}