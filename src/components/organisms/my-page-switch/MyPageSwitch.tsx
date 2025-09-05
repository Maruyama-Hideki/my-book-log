// マイページのタブ

import { Bookshelf } from "@/components/organisms/bookshelf/Bookshelf";
import { WishlistBooks } from "@/components/organisms/wishlist-books/WishlistBooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MyPageSwitch = () => {
  return (
    <div className="pt-[24px]">
      <Tabs defaultValue="本棚">
        <TabsList>
          <TabsTrigger value="本棚" className="w-[100px]">
            本棚
          </TabsTrigger>
          <TabsTrigger value="読みたい本" className="w-[100px]">
            読みたい本
          </TabsTrigger>
        </TabsList>
        <TabsContent value="本棚">
          <Bookshelf />
        </TabsContent>
        <TabsContent value="読みたい本">
          <WishlistBooks />
        </TabsContent>
      </Tabs>
    </div>
  );
};
