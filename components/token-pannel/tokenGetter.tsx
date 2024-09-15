import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import NewTokenForm from "@/components/token-pannel/tokenForm";
import QR from "@/components/token-pannel/qr";
import * as React from "react";

export function TokenAdder() {
  return (
    <div className={'px-4'}>
      <Tabs defaultValue="input" className="">
        <TabsList>
          <TabsTrigger value="input">Add By Input</TabsTrigger>
          <TabsTrigger value="qr">Add By QR</TabsTrigger>
        </TabsList>
        <TabsContent value="input"><NewTokenForm/></TabsContent>
        <TabsContent value="qr"><QR/></TabsContent>
      </Tabs>
    </div>
  )
}
