<template>
  <div>
    <v-row>
      <v-col
        ><v-menu
          v-model="TuNgayMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formatTuNgay"
              label="Từ Ngày"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="TuNgay"
            @input="TuNgayMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        ><v-menu
          v-model="DenNgayMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formatDenNgay"
              label="Đến Ngày"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="DenNgay"
            @input="DenNgayMenu = false"
          ></v-date-picker> </v-menu
      ></v-col>
      <v-col
        ><v-btn
          color="red"
          elevation="3"
          class="teal lighten-3"
          block
          @click="getData()"
          >Lấy dữ liệu</v-btn
        ></v-col
      >
      <v-col
        ><v-btn
          color="red"
          elevation="3"
          class="blue lighten-3"
          block
          @click="getData()"
          >Save</v-btn
        ></v-col
      >
      <v-col
        ><v-btn
          color="red"
          elevation="3"
          class="cyan lighten-3"
          block
          @click="getData()"
          >Xuất XML</v-btn
        ></v-col
      >
    </v-row>
    <v-col v-if="serverData">
      <v-row v-for="(item, index) in serverData" :key="index" cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-row v-if="item.recordsets.length > 0">
              <!-- bảng 1 -->
              <v-card-text><h2 style="color: red">XML 1</h2></v-card-text>
              <v-col cols="12">
                <v-data-table
                  :headers="headers1"
                  :items="item.recordsets[0]"
                >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                </template>
              </v-data-table>
              </v-col>
              <!-- bảng 2 -->
              <v-col v-if="item.recordsets[1].length > 0" cols="12">
                <v-card-text><h2 style="color: red">XML 2</h2></v-card-text>
                <v-data-table
                  :headers="headers2"
                  :items="item.recordsets[1]"
                ></v-data-table>
              </v-col>
              <!-- bảng 3 -->
              <v-col v-if="item.recordsets[2].length > 0" cols="12">
                <v-card-text><h2 style="color: red">XML 3</h2></v-card-text>
                <v-data-table
                  :headers="headers3"
                  :items="item.recordsets[2]"
                ></v-data-table>
              </v-col>
              <!-- bảng 4 -->
              <v-col v-if="item.recordsets[3].length > 0" cols="12">
                <v-card-text><h2 style="color: red">XML 4</h2></v-card-text>
                <v-data-table
                  :headers="headers4"
                  :items="item.recordsets[3]"
                ></v-data-table>
              </v-col>
              <!-- Add more v-data-table for other arrays in the 'item' object -->
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
    <v-dialog v-model="dialogeditxml1" max-width="500px">
      <v-card>
        <v-card-title>Edit Item</v-card-title>
        <v-card-text>
          <v-row v-for="(value, key) in editedItem" :key="key">
            <!-- Display each field in editedItem -->
            <v-text-field v-model="editedItem[key]" :label="key"></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveChanges">Save</v-btn>
          <v-btn color="secondary" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
// Import vào file của bạn
//import RTFJS from "rtf.js";

export default {
  name: "IndexPage",
  data: () => ({
    TuNgay: new Date().toISOString().substr(0, 10),
    DenNgay: new Date().toISOString().substr(0, 10),
    TuNgayMenu: false,
    DenNgayMenu: false,
    serverData: [

    ],
    dialogeditxml1: false,
      editedItem: {

      },

    headers1: [
      { text: "Actions", value: "actions", sortable: false },
      {
        text: "MA_LK",
        value: "ma_lk",
      },
      {
        text: "STT  ",
        align: "start",
        sortable: true,
        value: "stt",
      },
      {
        text: "MA_BN  ",
        sortable: true,
        value: "ma_bn",
      },
      {
        text: "HO_TEN",
        sortable: true,
        value: "ho_ten",
      },
      { text: "SO_CCCD", sortable: true, value: "so_cccd" },
      { text: "NGAY_SINH", sortable: true, value: "ngay_sinh" },
      { text: "GIOI_TINH", sortable: true, value: "gioi_tinh" },
      { text: "MA_QUOCTICH", sortable: true, value: "ma_quoctich" },
      { text: "MA_DANTOC", sortable: true, value: "ma_dantoc" },
      { text: "MA_NGHE_NGHIEP", sortable: true, value: "ma_nghe_nghiep" },
      { text: "DIA_CHI", sortable: true, value: "dia_chi" },
      { text: "MATINH_CU_TRU", sortable: true, value: "matinh_cu_tru" },
      { text: "MAHUYEN_CU_TRU", sortable: true, value: "mahuyen_cu_tru" },
      { text: "MAXA_CU_TRU", sortable: true, value: "maxa_cu_tru" },
      { text: "DIEN_THOAI", sortable: true, value: "dien_thoai" },
      { text: "MA_THE_BHYT", sortable: true, value: "ma_the_bhyt" },
      { text: "MA_DKBD", sortable: true, value: "ma_dkbd" },
      { text: "GT_THE_TU", sortable: true, value: "gt_the_tu" },
      { text: "GT_THE_DEN", sortable: true, value: "gt_the_den" },
      { text: "NGAY_MIEN_CCT", sortable: true, value: "ngay_mien_cct" },
      { text: "LY_DO_VV", sortable: true, value: "ly_do_vv" },
      { text: "LY_DO_VNT", sortable: true, value: "ly_do_vnt" },
      { text: "MA_LY_DO_VNT", sortable: true, value: "ma_ly_do_vnt" },
      { text: "CHAN_DOAN_VAO", sortable: true, value: "chan_doan_vao" },
      { text: "CHAN_DOAN_RV", sortable: true, value: "chan_doan_rv" },
      { text: "MA_BENH_CHINH", sortable: true, value: "ma_benh_chinh" },
      { text: "MA_BENH_KT", sortable: true, value: "ma_benh_kt" },
      { text: "MA_BENH_YHCT", sortable: true, value: "ma_benh_yhct" },
      { text: "MA_PTTT_QT", sortable: true, value: "ma_pttt_qt" },
      { text: "MA_DOITUONG_KCB", sortable: true, value: "ma_doituong_kcb" },
      { text: "MA_NOI_DI", sortable: true, value: "ma_noi_di" },
      { text: "MA_NOI_DEN", sortable: true, value: "ma_noi_den" },
      { text: "MA_TAI_NAN", sortable: true, value: "ma_tai_nan" },
      { text: "NGAY_VAO", sortable: true, value: "ngay_vao" },
      { text: "NGAY_VAO_NOI_TRU", sortable: true, value: "ngay_vao_noi_tru" },
      { text: "NGAY_RA", sortable: true, value: "ngay_ra" },
      { text: "GIAY_CHUYEN_TUYEN", sortable: true, value: "giay_chuyen_tuyen" },
      { text: "SO_NGAY_DTRI", sortable: true, value: "so_ngay_dtri" },
      { text: "PP_DIEU_TRI", sortable: true, value: "pp_dieu_tri" },
      { text: "KET_QUA_DTRI", sortable: true, value: "ket_qua_dtri" },
      { text: "MA_LOAI_RV", sortable: true, value: "ma_loai_rv" },
      { text: "GHI_CHU", sortable: true, value: "ghi_chu" },
      { text: "NGAY_TTOAN", sortable: true, value: "ngay_ttoan" },
      { text: "T_THUOC", sortable: true, value: "t_thuoc" },
      { text: "T_VTYT", sortable: true, value: "t_vtyt" },
      { text: "T_TONGCHI_BV", sortable: true, value: "t_tongchi_bv" },
      { text: "T_TONGCHI_BH", sortable: true, value: "t_tongchi_bh" },
      { text: "T_BNTT", sortable: true, value: "t_bntt" },
      { text: "T_BNCCT", sortable: true, value: "t_bncct" },
      { text: "T_BHTT", sortable: true, value: "t_bhtt" },
      { text: "T_NGUONKHAC", sortable: true, value: "t_nguonkhac" },
      { text: "T_BHTT_GDV", sortable: true, value: "t_bhtt_gdv" },
      { text: "NAM_QT", sortable: true, value: "nam_qt" },
      { text: "THANG_QT", sortable: true, value: "thang_qt" },
      { text: "MA_LOAI_KCB", sortable: true, value: "ma_loai_kcb" },
      { text: "MA_KHOA", sortable: true, value: "ma_khoa" },
      { text: "MA_CSKCB", sortable: true, value: "ma_cskcb" },
      { text: "MA_KHUVUC", sortable: true, value: "ma_khuvuc" },
      { text: "CAN_NANG", sortable: true, value: "can_nang" },
      { text: "CAN_NANG_CON", sortable: true, value: "can_nang_con" },
      { text: "NAM_NAM_LIEN_TUC", sortable: true, value: "nam_nam_lien_tuc" },
      { text: "NGAY_TAI_KHAM", sortable: true, value: "ngay_tai_kham" },
      { text: "MA_HSBA", sortable: true, value: "ma_hsba" },
      { text: "MA_TTDV", sortable: true, value: "ma_ttdv" },
      { text: "DU_PHONG", sortable: true, value: "du_phong" },
    ],
    headers2: [
      {
        text: "MA_LK",
        value: "ma_lk",
      },
      {
        text: "STT  ",
        align: "start",
        sortable: true,
        value: "stt",
      },
      { text: "MA_THUOC", sortable: true, value: "ma_thuoc" },
      { text: "MA_PP_CHEBIEN", sortable: true, value: "ma_pp_chebien" },
      { text: "MA_CSKCB_THUOC", sortable: true, value: "ma_cskcb_thuoc" },
      { text: "MA_NHOM", sortable: true, value: "ma_nhom" },
      { text: "TEN_THUOC", sortable: true, value: "ten_thuoc" },
      { text: "DON_VI_TINH", sortable: true, value: "don_vi_tinh" },
      { text: "HAM_LUONG", sortable: true, value: "ham_luong" },
      { text: "DUONG_DUNG", sortable: true, value: "duong_dung" },
      { text: "DANG_BAO_CHE", sortable: true, value: "dang_bao_che" },
      { text: "LIEU_DUNG", sortable: true, value: "lieu_dung" },
      { text: "CACH_DUNG", sortable: true, value: "cach_dung" },
      { text: "SO_DANG_KY", sortable: true, value: "so_dang_ky" },
      { text: "TT_THAU", sortable: true, value: "tt_thau" },
      { text: "", sortable: true, value: "" },
      { text: "PHAM_VI", sortable: true, value: "pham_vi" },
      { text: "TYLE_TT_BH", sortable: true, value: "tyle_tt_bh" },
      { text: "SO_LUONG", sortable: true, value: "so_luong" },
      { text: "DON_GIA", sortable: true, value: "don_gia" },
      { text: "THANH_TIEN_BV", sortable: true, value: "thanh_tien_bv" },
      { text: "THANH_TIEN_BH", sortable: true, value: "thanh_tien_bh" },
      { text: "T_NGUONKHAC_NSNN", sortable: true, value: "t_nguonkhac_nsnn" },
      { text: "T_NGUONKHAC_VTNN", sortable: true, value: "t_nguonkhac_vtnn" },
      { text: "T_NGUONKHAC_VTTN", sortable: true, value: "t_nguonkhac_vttn" },
      { text: "T_NGUONKHAC_CL", sortable: true, value: "t_nguonkhac_cl" },
      { text: "T_NGUONKHAC", sortable: true, value: "t_nguonkhac" },
      { text: "MUC_HUONG", sortable: true, value: "muc_huong" },
      { text: "T_BNTT", sortable: true, value: "t_bntt" },
      { text: "T_BNCCT", sortable: true, value: "t_bncct" },
      { text: "T_BHTT", sortable: true, value: "t_bhtt" },
      { text: "MA_KHOA", sortable: true, value: "ma_khoa" },
      { text: "MA_BAC_SI", sortable: true, value: "ma_bac_si" },
      { text: "MA_DICH_VU", sortable: true, value: "ma_dich_vu" },
      { text: "NGAY_YL", sortable: true, value: "ngay_yl" },
      { text: "MA_PTTT", sortable: true, value: "ma_pttt" },
      { text: "NGUON_CTRA", sortable: true, value: "nguon_ctra" },
      { text: "VET_THUONG_TP", sortable: true, value: "vet_thuong_tp" },
      { text: "DU_PHONG", sortable: true, value: "du_phong" },
    ],
    headers3: [
      {
        text: "MA_LK",
        value: "ma_lk",
      },
      {
        text: "STT  ",
        align: "start",
        sortable: true,
        value: "stt",
      },
      { text: "MA_DICH_VU", sortable: true, value: "ma_dich_vu" },
      { text: "MA_PTTT_QT", sortable: true, value: "ma_pttt_qt" },
      { text: "MA_VAT_TU", sortable: true, value: "ma_vat_tu" },
      { text: "MA_NHOM", sortable: true, value: "ma_nhom" },
      { text: "GOI_VTYT", sortable: true, value: "goi_vtyt" },
      { text: "TEN_VAT_TU", sortable: true, value: "ten_vat_tu" },
      { text: "TEN_DICH_VU", sortable: true, value: "ten_dich_vu" },
      { text: "MA_XANG_DAU", sortable: true, value: "ma_xang_dau" },
      { text: "DON_VI_TINH", sortable: true, value: "don_vi_tinh" },
      { text: "PHAM_VI", sortable: true, value: "pham_vi" },
      { text: "SO_LUONG", sortable: true, value: "so_luong" },
      { text: "DON_GIA_BV", sortable: true, value: "don_gia_bv" },
      { text: "DON_GIA_BH", sortable: true, value: "don_gia_bh" },
      { text: "TT_THAU", sortable: true, value: "tt_thau" },
      { text: "", sortable: true, value: "" },
      { text: "TYLE_TT_DV", sortable: true, value: "tyle_tt_dv" },
      { text: "TYLE_TT_BH", sortable: true, value: "tyle_tt_bh" },
      { text: "THANH_TIEN_BV", sortable: true, value: "thanh_tien_bv" },
      { text: "THANH_TIEN_BH", sortable: true, value: "thanh_tien_bh" },
      { text: "T_TRANTT", sortable: true, value: "t_trantt" },
      { text: "MUC_HUONG", sortable: true, value: "muc_huong" },
      { text: "T_NGUONKHAC_NSNN", sortable: true, value: "t_nguonkhac_nsnn" },
      { text: "T_NGUONKHAC_VTNN", sortable: true, value: "t_nguonkhac_vtnn" },
      { text: "T_NGUONKHAC_VTTN", sortable: true, value: "t_nguonkhac_vttn" },
      { text: "T_NGUONKHAC_CL", sortable: true, value: "t_nguonkhac_cl" },
      { text: "T_NGUONKHAC", sortable: true, value: "t_nguonkhac" },
      { text: "T_BNTT", sortable: true, value: "t_bntt" },
      { text: "T_BNCCT", sortable: true, value: "t_bncct" },
      { text: "T_BHTT", sortable: true, value: "t_bhtt" },
      { text: "MA_KHOA", sortable: true, value: "ma_khoa" },
      { text: "MA_GIUONG", sortable: true, value: "ma_giuong" },
      { text: "MA_BAC_SI", sortable: true, value: "ma_bac_si" },
      { text: "NGUOI_THUC_HIEN", sortable: true, value: "nguoi_thuc_hien" },
      { text: "MA_BENH", sortable: true, value: "ma_benh" },
      { text: "MA_BENH_YHCT", sortable: true, value: "ma_benh_yhct" },
      { text: "NGAY_YL", sortable: true, value: "ngay_yl" },
      { text: "NGAY_TH_YL", sortable: true, value: "ngay_th_yl" },
      { text: "NGAY_KQ", sortable: true, value: "ngay_kq" },
      { text: "MA_PTTT", sortable: true, value: "ma_pttt" },
      { text: "VET_THUONG_TP", sortable: true, value: "vet_thuong_tp" },
      { text: "PP_VO_CAM", sortable: true, value: "pp_vo_cam" },
      { text: "VI_TRI_TH_DVKT", sortable: true, value: "vi_tri_th_dvkt" },
      { text: "MA_MAY", sortable: true, value: "ma_may" },
      { text: "MA_HIEU_SP", sortable: true, value: "ma_hieu_sp" },
      { text: "TAI_SU_DUNG", sortable: true, value: "tai_su_dung" },
      { text: "DU_PHONG", sortable: true, value: "du_phong" },
    ],
    headers4: [
      {
        text: "MA_LK",
        value: "ma_lk",
      },
      {
        text: "STT  ",
        align: "start",
        sortable: true,
        value: "stt",
      },
      { text: "MA_DICH_VU", sortable: true, value: "ma_dich_vu" },
      { text: "MA_CHI_SO", sortable: true, value: "ma_chi_so" },
      { text: "TEN_CHI_SO", sortable: true, value: "ten_chi_so" },
      { text: "GIA_TRI", sortable: true, value: "gia_tri" },
      { text: "DON_VI_DO", sortable: true, value: "don_vi_do" },
      { text: "MO_TA", sortable: true, value: "mo_ta" },
      { text: "KET_LUAN", sortable: true, value: "ket_luan" },
      { text: "NGAY_KQ", sortable: true, value: "ngay_kq" },
      { text: "MA_BS_DOC_KQ", sortable: true, value: "ma_bs_doc_kq" },
      { text: "DU_PHONG", sortable: true, value: "du_phong" },
    ],
  }),
  computed: {
    formatTuNgay() {
      return this.formatDate(this.TuNgay);
    },
    formatDenNgay() {
      return this.formatDate(this.DenNgay);
    },
  },
  created() {

  },
  methods: {
    async save() {
      if (this.serverData?.length > 0) {
        for (let index = 0; index < this.serverData; index++) {
          // duyệt từ đây
          if (this.serverData[index].recordsets[0]) {
            for (let j = 0; j < this.serverData[index].recordsets[0]; j++) {
              const tempBang1 = {
                ma_lk: this.serverData[index].recordsets[0][index].ma_lk,
              };
              // insert
            }
          }
        }
      }
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    // rtfToText(rtf) {
    //   // Loại bỏ các thẻ định dạng RTF
    //   const plainText = rtf.replace(/\\[\w*]?\w+\b/g, "");

    //   // Xóa các ký tự đặc biệt còn lại của RTF
    //   const textWithoutSpecialChars = plainText.replace(/[{}\\]+/g, "");

    //   return textWithoutSpecialChars;
    // },

    async getData() {
      try {
        const response = await axios.get("http://localhost:3130/getData", {
          params: {
            TuNgay: this.TuNgay, // Thay bằng dữ liệu thực tế từ giao diện người dùng
            DenNgay: this.DenNgay, // Thay bằng dữ liệu thực tế từ giao diện người dùng
          },
        });
        this.serverData = response.data.result;
        // const rtfString = rtfString1.replace(/\\/g, "\\\\");
        // const rtfString = "{\\rtf1\\ansi\\b hello world}";
        // const rtfParser = new RTFJS.RTFJS();
        // const parsedText = rtfParser.Parse(rtfString);

        // console.log(parsedText); // Kết quả: hello world

        // this.serverData.forEach((item) => {
        //   if (item.recordsets && item.recordsets.length > 0) {
        //     item.recordsets.forEach((recordset) => {
        //       recordset.forEach((recordsetitem) => {
        //         if (recordsetitem.mo_ta) {
        //           const rtfString1 = recordsetitem.mo_ta;
        //           const rtfString = rtfString1.replace(/\\/g, "\\\\");

        //           recordsetitem.mo_ta = this.rtfToText(rtfString);
        //           //const a = this.textToUtf8(recordsetitem.mo_ta);
        //           //console.log(a); // Kết quả: hello world
        //         }
        //       });
        //     });
        //   }
        // });

        //console.log(this.serverData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        // Xử lý lỗi nếu có
      }
    },
    editItem(item) {
      // Open the dialog and populate the editedItem object with the clicked item's data
      this.editedItem = { ...item }; // Copy the item data to editedItem
      this.dialogeditxml1 = true;
    },
    saveChanges() {
     // Tìm vị trí của editedItem trong serverData
  const index = this.serverData.findIndex(item => item.id === this.editedItem.id);
  if (index !== -1) {
    // Cập nhật giá trị của editedItem trong serverData
    this.serverData.splice(index, 1, this.editedItem);
  }
  // Đóng dialog
  this.dialogeditxml1 = false;
  // Cập nhật bảng
  this.updateTable();
  },
  updateTable() {

    this.items = [...this.serverData];
  },
    closeDialog() {
      // Close the dialog without saving changes
      this.dialogeditxml1 = false;
    },
  },
};
</script>
<style>
.col {
  align-self: center;
}
</style>
