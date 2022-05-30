import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Country from "./Country";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState([]);
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                setSearch(data);
            });
    }, []);
    const handleSearch = (text) => {
        const filtered = countries.filter((country) =>
            country.name.common.includes(text)
        );
        setSearch(filtered);
    };
    return (
        <View>
            <Text>Countries {search.length}</Text>
            <TextInput
                onChangeText={handleSearch}
                style={styles.input}
            ></TextInput>
            <ScrollView>
                {countries.map((country) => (
                    <Country country={country}></Country>
                ))}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
