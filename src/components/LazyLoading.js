import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const LazyLoading = () => {
    let arr = new Array(10).fill('')
    return (
        <View>
                {arr.map((item, index) => (
                    <SkeletonPlaceholder key={index}>
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={20}>
                        <SkeletonPlaceholder.Item width={80} height={80} />
                        <SkeletonPlaceholder.Item marginLeft={20}>
                            <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
                            <SkeletonPlaceholder.Item
                                marginTop={6}
                                width={300}
                                height={20}
                                borderRadius={4}
                            />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                )
                )}
        </View>
    );
};
export default LazyLoading;