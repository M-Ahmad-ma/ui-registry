import * as React from "react"
import {Button} from '../components/Button'

export default function ButtonExample() {
  return (
    <div className="space-y-6 p-6">
      {/* Variants */}
      <div className="space-x-2">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      {/* Sizes */}
      <div className="space-x-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* Combined Variants + Sizes */}
      <div className="space-y-3">
        <div className="space-x-2">
          <Button variant="default" size="sm">Default sm</Button>
          <Button variant="default" size="md">Default md</Button>
          <Button variant="default" size="lg">Default lg</Button>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">Outline sm</Button>
          <Button variant="outline" size="md">Outline md</Button>
          <Button variant="outline" size="lg">Outline lg</Button>
        </div>
      </div>
    </div>
  )
}
