
import * as React from "react"
import { Input } from "@/components/ui/Input"

export default function InputExample() {
  return (
    <div className="space-y-4 p-6 max-w-md">
      <Input placeholder="Default input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Password" type="password" />
      <Input placeholder="Email address" type="email" />
      <Input placeholder="With default value" defaultValue="Hello" />
    </div>
  )
}
