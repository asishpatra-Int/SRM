import {useLocalSearchParams} from "expo-router";

import {BhaktiAlbumScreen} from "@/screens/explore";

export default function BhaktiAlbumRoute() {
  const {albumId} = useLocalSearchParams<{albumId: string}>();
  return <BhaktiAlbumScreen albumId={albumId} />;
}
