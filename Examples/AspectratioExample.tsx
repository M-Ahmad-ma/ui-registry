
import { AspectRatio } from "@/components/ui/AspectRatio";

export default function AspectRatioExample() {
  return (
    <div className="w-full space-y-6 p-4">
      <div className="w-full">
        <h2 className="font-bold mb-2">16:9 Aspect Ratio</h2>
        <AspectRatio ratio={16 / 9} className="border rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Random"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>

      <div>
        <h2 className="font-bold mb-2">1:1 Aspect Ratio</h2>
        <AspectRatio ratio={1} className="border rounded-lg overflow-hidden">
          <div className="bg-blue-500 flex items-center justify-center text-white font-bold">
            1:1 Box
          </div>
        </AspectRatio>
      </div>

      <div>
        <h2 className="font-bold mb-2">4:3 Aspect Ratio</h2>
        <AspectRatio ratio={4 / 3} className="border rounded-lg overflow-hidden">
          <div className="bg-green-500 flex items-center justify-center text-white font-bold">
            4:3 Box
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
