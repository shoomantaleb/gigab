import Navbar from "../components/Navbar"

export default function Lifting(){
    return (
<div>
    <div className="flex items-center justify-center mb-1">
        <div className=" px-4 py-2 text-neutral-600 text-6xl font-bold font-['Inter']">Edit Plan</div>
        <div className="ml-8 px-8 py-2 custom-text-size text-white rounded-lg bg-zinc-600 text-6xl font-bold font-['Inter']">Save</div>
</div>

   <div className="flex justify-center space-x-80 mb-1" >
     <div className="w-[185px] h-[31px] text-neutral-600 text-3xl font-bold font-['Inter']">Wednesday</div>
     <div className="text-right text-neutral-600 text-3xl font-bold font-['Inter'] underline">Leg Day</div>
   </div>

    <div className= "flex justify-center mb-4">
        <div className="w-[679px] h-[58px] relative">
            <div className="w-[679px] h-[58px] left-0 top-0 absolute bg-zinc-600 rounded-[18px] shadow" />
            <div className="w-[341px] h-[58px] left-0 top-0 absolute bg-white rounded-[18px] shadow" />
            <div className="w-[230px] h-[31px] left-[21px] top-[12px] absolute text-neutral-600 text-3xl font-bold font-['Inter'] underline">Bench Press</div>
            <div className="w-[78px] h-[31px] left-[380px] top-[12px] absolute text-white text-3xl font-normal font-['Inter'] underline">350</div>
            <div className="w-11 h-[37px] left-[478px] top-[9px] absolute text-white text-3xl font-normal font-['Inter'] underline">10</div>
            <div className="w-[45px] h-[37px] left-[572px] top-[9px] absolute text-center text-white text-3xl font-normal font-['Inter'] underline">5</div>
            <div className="w-[113px] h-[25px] left-[489px] top-[15px] absolute text-center text-white text-xl font-normal font-['Inter']">reps</div>
            <div className="w-12 h-[26px] left-[613px] top-[14px] absolute text-center text-white text-xl font-normal font-['Inter']">sets</div>
        </div>
    </div>

  <div className= "flex justify-center mb-4">
    <div className="w-[679px] h-[58px] relative">
        <div className="w-[679px] h-[58px] left-0 top-0 absolute bg-zinc-600 rounded-[18px] shadow" />
        <div className="w-[341px] h-[58px] left-0 top-0 absolute bg-white rounded-[18px] shadow" />
        <div className="w-[230px] h-[31px] left-[21px] top-[12px] absolute text-neutral-600 text-3xl font-bold font-['Inter'] underline">Curls</div>
        <div className="w-[78px] h-[31px] left-[380px] top-[12px] absolute text-white text-3xl font-normal font-['Inter'] underline">350</div>
        <div className="w-11 h-[37px] left-[478px] top-[9px] absolute text-white text-3xl font-normal font-['Inter'] underline">10</div>
        <div className="w-[45px] h-[37px] left-[572px] top-[9px] absolute text-center text-white text-3xl font-normal font-['Inter'] underline">5</div>
        <div className="w-[113px] h-[25px] left-[489px] top-[15px] absolute text-center text-white text-xl font-normal font-['Inter']">reps</div>
        <div className="w-12 h-[26px] left-[613px] top-[14px] absolute text-center text-white text-xl font-normal font-['Inter']">sets</div>
     </div>
   </div>

<div className= "flex justify-center mb-4">
   <div className="w-[679px] h-[58px] relative">
     <div className="w-[679px] h-[58px] left-0 top-0 absolute bg-zinc-600 rounded-[18px] shadow" />
     <div className="w-[341px] h-[58px] left-0 top-0 absolute bg-white rounded-[18px] shadow" />
     <div className="w-[230px] h-[31px] left-[21px] top-[12px] absolute text-neutral-600 text-3xl font-bold font-['Inter'] underline">Something else</div>
     <div className="w-[78px] h-[31px] left-[380px] top-[12px] absolute text-white text-3xl font-normal font-['Inter'] underline">350</div>
     <div className="w-11 h-[37px] left-[478px] top-[9px] absolute text-white text-3xl font-normal font-['Inter'] underline">10</div>
     <div className="w-[45px] h-[37px] left-[572px] top-[9px] absolute text-center text-white text-3xl font-normal font-['Inter'] underline">5</div>
     <div className="w-[113px] h-[25px] left-[489px] top-[15px] absolute text-center text-white text-xl font-normal font-['Inter']">reps</div>
     <div className="w-12 h-[26px] left-[613px] top-[14px] absolute text-center text-white text-xl font-normal font-['Inter']">sets</div>
    </div>
</div>

<div className="flex justify-center items-center mb-4 border-2">
   <div className="border-2 text-7xl border-red-500 w-[60px] h-[60px] bg-zinc-600 rounded-full flex items-center justify-center text-white pb-4">+</div>
  </div>


  
</div>
    )
}



