import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Table, Row, Rows } from "react-native-table-component";

import tableData from "./tableData";

const cellPhoneWidth = Dimensions.get("screen").width;

const App = (props) => {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [isTableScreenOn, setIsTableScreenOn] = useState(false);

  const calculate = () => {
    if (!altura || !peso) {
      Alert.alert("Erro", "Insira valores válidos!");
      return;
    }

    const result = peso / (parseFloat(altura) * parseFloat(altura));

    Alert.alert(
      "Concluído",
      `Seu IMC é ${result.toFixed(
        1
      )}. Cheque a Tabela de Informações para mais informações sobre seu IMC atual e aonde você está classificado.`
    );
  };

  const clear = () => {
    setAltura("");
    setPeso("");
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <StatusBar backgroundColor={"#002b54"} />
          <Text style={styles.text}>Cálculo de IMC</Text>
        </View>
        <View style={styles.alignBox}>
          {isTableScreenOn ? (
            <Table borderStyle={{ borderWidth: 2, borderColor: "#002b54" }}>
              <Row
                data={tableData.tableHead}
                style={styles.head}
                textStyle={styles.tableHeadText}
              />
              <Rows
                data={tableData.tableContent}
                textStyle={styles.tableInfo}
              />
            </Table>
          ) : (
            <>
              <Text style={styles.label}>Insira sua altura (Com o ponto):</Text>
              <TextInput
                selectionColor={"navy"}
                placeholder="Ex.: 1.78"
                style={styles.input}
                keyboardType="decimal-pad"
                value={altura}
                maxLength={4}
                onChangeText={(text) => setAltura(text)}
              />
              <Text style={{ ...styles.label, marginTop: 15 }}>
                Insira seu peso:
              </Text>
              <TextInput
                selectionColor={"navy"}
                placeholder="Ex.: 65"
                maxLength={3}
                keyboardType="decimal-pad"
                style={styles.input}
                value={peso}
                onChangeText={(text) => setPeso(text)}
              />
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.6}
                onPress={calculate}
              >
                <Text style={styles.textBtn}>Calcular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.btn, marginTop: 10 }}
                activeOpacity={0.6}
                onPress={clear}
              >
                <Text style={styles.textBtn}>Refazer</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={{ ...styles.btn, marginTop: 10 }}
            activeOpacity={0.6}
            onPress={() => setIsTableScreenOn(!isTableScreenOn)}
          >
            <Text style={styles.textBtn}>
              {isTableScreenOn ? "Fechar" : "Abrir"} Tabela de Informações
            </Text>
          </TouchableOpacity>
          <Text style={styles.code}>Desenvolvido por Bruno Rogério, 3DS2</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  tabBar: {
    paddingTop: Constants.statusBarHeight,
    width: cellPhoneWidth,
    backgroundColor: "#002b54",
    alignItems: "center",
    padding: 15,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  alignBox: {
    width: cellPhoneWidth - 40,
    marginTop: 15,
  },
  label: {
    fontSize: 18,
  },
  input: {
    borderRadius: 3,
    fontSize: 18,
    height: 40,
    paddingLeft: 5,
    backgroundColor: "#ebebeb",
  },
  btn: {
    width: "100%",
    marginTop: 18,
    backgroundColor: "#002b54",
    height: 45,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontSize: 16,
    color: "white",
  },
  code: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 15,
    color: "#bbb",
  },
  head: {
    height: 40,
    backgroundColor: "#002b54",
  },
  tableInfo: {
    margin: 6,
    textAlign: "center",
  },
  tableHeadText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default App;
