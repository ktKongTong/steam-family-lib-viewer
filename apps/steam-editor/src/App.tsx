import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {getTextCheckSum, readBVDF, vdfToTextFormat, writeAppInfoBinaryVDF} from "@repo/steam-vdf";
import {FormEvent, useState} from "react";
import {BVDFField} from "@repo/steam-vdf";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover"

function App() {
  const [appinfos , setAppinfos] = useState<AppInfoItemProps[]>([])
  const handleClick = async () => {
    const [newHandle] = await window.showOpenFilePicker();
    const f = await newHandle.getFile()
    const buf = await f.arrayBuffer()
    const res = await readBVDF(buf)
    setAppinfos(res as any)
    console.log(res)
  }

  const showdata = async () => {
    console.log(appinfos)
  }

  const saveData = async () => {

    const options = {
      types: [{
        description: 'Steam App Info',
        accept: {
          'text/steam-vdf': ['.vdf'],
        },
      }],
    };
    // @ts-ignore
    const handle = await window.showSaveFilePicker(options);
    console.log("writing")
    const buf = await writeAppInfoBinaryVDF(appinfos, '0x29')
    const writable = await handle.createWritable();
    await writable.write(buf);
    await writable.close();

  }

  return (
    <main className={' max-w-4xl w-full mx-auto bg-zinc-50 flex items-center justify-center flex-col text-zinc-900'}>
      <button onClick={handleClick}>
        select file
      </button>
      <button onClick={showdata}>
        show data
      </button>
      <button onClick={saveData}>
        save data
      </button>
      <div className="card">

        <div className={'grid grid-cols-4 '}>
          {
            appinfos.map((it, idx) => {
              return <AppItem {...it} key={it.appid}/>
            })
          }

        </div>
      </div>
      <p className="read-the-docs">
      </p>
    </main>
  )
}

//       appid: appid,
//       infoState: infoState,
//       lastUpdated: new Date(lastUpdated * 1000),
//       picsToken: picsToken,
//       hash: hash,
//       changeNumber: changeNumber

interface AppInfoItemProps {
  appid: number,
  infoState: number,
  lastUpdated: number,
  picsToken: bigint,
  hash: string,
  changeNumber: number
  binaryDataHash?: string
  data: App
}

interface App {
  appinfo: {
    name: 'appinfo',
    type: 'object',
    order: number
    data: {
      appid: BVDFField,
      publich_only?: BVDFField,
      common?: {
        name: 'common',
        type: 'object',
        order: number
        data: {
          name: { type: 'str', data: string, name: 'name' },
          type: { type: 'str', data: string, name: 'type' },
          associations?: any,
          [key: string]: any
        },
      }
    }
  }
}
const AppItem = (app: AppInfoItemProps) => {
  const { appinfo } = app.data

  // const text = vdfToTextFormat(appinfo)
  // getTextCheckSum(text).then(
  //   res => {
  //     if(app.hash === res) {
  //     }else {
  //
  //       // console.log('checksum not match', app.appid)
  //       // console.log(appinfo)
  //     }
  //     // console.log('app', app)
  //     // console.log('appdetail', text)
  //   }
  // )


  if (!appinfo?.data.common) {
    return <></>
  }
  const icoData = appinfo.data.common?.data.icon?.data
  const iconurl = icoData ? `https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/${app.appid}/${icoData}.jpg` : ''

  return <div className={'p-2 rounded bg-zinc-100 m-2 relative flex flex-col '}>
    <div className={'flex gap-2'}>
      <img src={iconurl} alt="" className={'w-4 h-4 rounded'}/>
      <span className={'text-xs font-medium'}>{appinfo.data.common?.data.name?.data}</span>

    {/* 编辑 名称编辑、排序规则... */}

    </div>
    <Popover>
      <PopoverTrigger className={'ml-auto mr-0 px-2 rounded-md text-md border bg-zinc-200'}>detail</PopoverTrigger>
      <PopoverContent>
        <VDF field={appinfo}/>
      </PopoverContent>
    </Popover>

  </div>
}

interface VDFProps {
  name: string
  type: string
  data: any
}

const VDF = ({field}: {
  field: VDFProps
}) => {
  // patched field
  // collapsible tree struct
  const {data, type, name} = field
  const [render, renderUpdate] = useState()

  // data.a = b
  const [isOpen, setIsOpen] = useState(false)

  const [input, setInput] = useState(data)
  const setupData = () => {
    // convert data
    let d: any = input
    if(inputType === 'number' && type == 'int32') {
      console.log("set number", d)
      d = Number(d)
    }else if(inputType === 'checkbox') {
      d = Boolean(d)
    } else if(inputType === 'text' && type == 'uint64') {
      d = BigInt(d)
    }else {
      return
    }
    field.data = d
  }
  const inputType = {
    'str': 'text',
    'int32': 'number',
    'uint64': 'text',
    'float32': 'number',
    'boolean': 'checkbox',
  }[type]
  if(type === 'object') {
    return <div className={'flex flex-col gap-1 text-zinc-900'}>
      <span className={'text-xs inline-flex items-center'} onClick={() => setIsOpen(!isOpen)}>
        <i className={`${isOpen ? 'rotate-90' : ''}`}>▶</i>
        {name}
      </span>
      {
        isOpen && <div className={'flex flex-col gap-1 ml-2'}>
          {
            Object.entries(data).map(([k, v]) => {
              return <VDF key={k} field={v as any}/>
            })
          }
          </div>
      }
    </div>
  }
  return <div className={'flex flex-col gap-1'}>
    {
      <div className={'text-sm'}>
        <div className={'inline-flex gap-2 items-center w-full justify-between'}>
          <span>{name}</span>
          <span className={'text-xs rounded-md border px-1'}>{type}</span>
        </div>
        <div className={'flex justify-between items-center'}>
          <input
            type={inputType}
            value={input}
            className={'border p-1 rounded-md overflow-auto'}
            onInput={(e) => {
              setInput(e.currentTarget.value)
            }}
          />
          <button onClick={setupData} className={'bg-zinc-950 text-zinc-100/90 text-md font-medium px-2 rounded'}>
            apply
          </button>
        </div>


      </div>
    }
  </div>

}


export default App
