import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logo from '../assets/logo.jpg';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 84,
        height: 84,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    titleContainer: {
        marginTop: 24,
    },
    reportTitle: {
        color: '#3778C2',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#3778C2',
    },
    name: {
        width: '25%',
        borderRightColor: '#3778C2',
        borderRightWidth: 1,
    },
    price: {
        width: '25%',
        borderRightColor: '#3778C2',
        borderRightWidth: 1,
    },

    qty: {
        width: '25%',
        borderRightColor: '#3778C2',
        borderRightWidth: 1,
    },

    totalPrice: {
        width: '25%'
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    productName: {
        width: '25%',
        textAlign: 'left',
        borderRightColor: '#3778C2',
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    productPrice: {
        width: '25%',
        borderRightColor: '#3778C2',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    productQty : {
        width: '25%',
        borderRightColor: '#3778C2',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    productTotalPrice: {
        width: '25%',
        textAlign: 'right',
        paddingRight: 8,
    }
});



const GeneratePdf = ({ props }) => {
    return <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={logo} />
            <View style={styles.titleContainer}>
                <Text style={styles.reportTitle}>
                    <p className='title'>
                        Invoice
                    </p>
                </Text>
            </View>
            <View style={styles.tableContainer}>
                <Text style={styles.name}>
                    Product Name
                </Text>

                <Text style={styles.price}>
                    Product Price
                </Text>
                <Text style={styles.qty}>
                    Quantity
                </Text>
                <Text style={styles.totalPrice}>
                    Price 
                </Text>

            </View>
            {
                props.menuItems.map(item => {
                    return <View style={styles.row}>
                        <Text style={styles.productName}>

                            {item.product.name}
                        </Text>
                        <Text style={styles.productPrice}>
                            {item.product.price + '$'}
                        </Text>
                        <Text style={styles.productQty}>
                            {item.product.qty}
                        </Text>
                        <Text style={styles.totalPrice}>
                            {item.product.qty * item.product.price + '$'}
                            </Text>
                    </View>
                })

            }
            <View style={styles.row}>
                <Text style={styles.productName}>
                </Text>
                <Text style={styles.productPrice}>
                </Text>
                <Text style={styles.productTotalPrice}>
                    Total : {props.order[0].totalPrice + '$'}
                </Text>
            </View>
        </Page>
    </Document>
}

export default GeneratePdf;