import { Text, View, SafeAreaView, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { Stack, useRouter, useRouteParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn } from "../../components"
import { COLORS, icons, SIZES } from "../../constants"
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
    const params = useRouteParams();
    const router = useRouter();

    const { data, isLoading, error, reFetch } = useFetch("job-details", {
        job_id: params.id
    })


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {

    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"

                        />
                    ),
                    headerTitle: " "
                }}
            >
                <>
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : error ? (
                            <Text>Ha pasado algo malo</Text>
                        ) : data.length === 0 ? (
                            <Text>No hay datos</Text>
                        ) : (
                            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                <Company 
                                companyLogo={data[0].employer_logo}
                                jobTittle={data[0].job_tittle}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                                />
                                <JobTabs />
                            </View>
                        )}
                    </ScrollView>
                </>


            </Stack.Screen>

        </SafeAreaView>

    )
}

export default JobDetails;