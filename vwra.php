<?php
  $result_id = $_GET['result_id'];
  $log = "file:/VWRA_Test_Logging/" . $result_id . ".log";
?>

<?php echo '<?xml version="1.0"?>'; ?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" xmlns:gvp="http://www.genesyslab.com/2006/vxml21-extension">

<!-- Need to remove telephone-event under mpc.codec for mcp in order to work -->

<!-- Variable Configurations in Milliseconds -->

<var name="Main_Menu_PromptDuration" expr="13000"/>

<!-- Test 1: DTMF Recognition Test -->

<var name="DTMF_First_PromptDuration" expr="7000"/>
<var name="DTMF_Second_PromptDuration" expr="3000"/>
<var name="DTMF_Reply_PromptDuration" expr="1000"/>

<!-- Test 2: Speech Resource Test -->

<var name="Speech_First_PromptDuration" expr="4000"/>
<var name="Speech_Second_PromptDuration" expr="2000"/>
<var name="Speech_Reply_PromptDuration" expr="1000"/>

<!-- Test 3: TTS Test -->

<var name="TTS_First_PromptDuration" expr="4000"/>
<var name="TTS_Reply_PromptDuration" expr="19000"/>

<!-- Disconnect -->

<var name="Disconnect_PromptDuration" expr="1500"/>

<!-- Acceptable Variances -->

<var name="Main_Menu_Variance" expr="1500"/>
<var name="Test1_Variance" expr="1500"/>
<var name="Test2_Variance" expr="1500"/>
<var name="Test3_Variance" expr="1500"/>
<var name="Disconnect_Variance" expr="800"/>

<!-- Auto Calculated Boundaries -->

<var name="Main_Menu_Upper" expr="Main_Menu_PromptDuration + Main_Menu_Variance"/>
<var name="Main_Menu_Lower" expr="Main_Menu_PromptDuration - Main_Menu_Variance"/>

<var name="DTMF_First_Upper" expr="DTMF_First_PromptDuration + Test1_Variance"/>
<var name="DTMF_First_Lower" expr="DTMF_First_PromptDuration - Test1_Variance"/>
<var name="DTMF_Second_Upper" expr="DTMF_Second_PromptDuration + Test1_Variance"/>
<var name="DTMF_Second_Lower" expr="DTMF_Second_PromptDuration - Test1_Variance"/>

<var name="Speech_First_Upper" expr="Speech_First_PromptDuration + Test2_Variance"/>
<var name="Speech_First_Lower" expr="Speech_First_PromptDuration - Test2_Variance"/>
<var name="Speech_Second_Upper" expr="Speech_Second_PromptDuration + Test2_Variance"/>
<var name="Speech_Second_Lower" expr="Speech_Second_PromptDuration - Test2_Variance"/>

<var name="TTS_First_Upper" expr="TTS_First_PromptDuration + Test3_Variance"/>
<var name="TTS_First_Lower" expr="TTS_First_PromptDuration - Test3_Variance"/>
<var name="TTS_Reply_Upper" expr="TTS_Reply_PromptDuration + Test3_Variance"/>
<var name="TTS_Reply_Lower" expr="TTS_Reply_PromptDuration - Test3_Variance"/>

<var name="Disconnect_Upper" expr="Disconnect_PromptDuration + Disconnect_Variance"/>
<var name="Disconnect_Lower" expr="Disconnect_PromptDuration - Disconnect_Variance"/>



<!-- Main Application -->
<var name="dtmf_reply" expr="''"/>
<var name="speech_reply" expr="''"/>

<form id="dtmf">

  <catch event="connection.disconnect.hangup">
      <log gvp:dest="<?php echo $log; ?>"> Error: Call Disconnected </log>
  </catch>

  <block>

    <log gvp:dest="calllog">
      enable callrec recsrc=mixed type=audio/wav;codec=alaw;
      directory ../logs/VWRA_Test_Logging absolute;
    </log>

    <log gvp:dest="<?php echo $log; ?>"> VWRA Test Begin </log>
    <log gvp:dest="<?php echo $log; ?>"> GVP Session ID: <value expr="session.com.genesyslab.sessionid"/> </log>

  </block>

  <block>

  <log gvp:dest="<?php echo $log; ?>"> Begin DTMF Recognition Test </log>

  </block>

  <record name="Main_Menu" Finalsilence="1s">
    <filled>
      <if cond="(Main_Menu$.duration - 1000) &lt; Main_Menu_Lower || (Main_Menu$.duration - 1000) &gt; Main_Menu_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: Main Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="Main_Menu_Lower"/> to <value expr="Main_Menu_Upper"/>; Actual: <value expr="(Main_Menu$.duration - 1000)"/> </log>
        <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(Main_Menu$.duration - 1000)"/>; Context: Main Menu </log>
        <audio src="file:///genesys/vwra/audiofile/dtmf_1.vox"/>
      </if>
    </filled>
  </record>

  <record name="DTMF_First" Finalsilence="1s">
    <filled>
      <if cond="(DTMF_First$.duration - 1000) &lt; DTMF_First_Lower || (DTMF_First$.duration - 1000) &gt; DTMF_First_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: DTMF First Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="DTMF_First_Lower"/> to <value expr="DTMF_First_Upper"/>; Actual: <value expr="(DTMF_First$.duration - 1000)"/> </log>
        <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(DTMF_First$.duration - 1000)"/>; Context: DTMF First Menu </log>
        <audio src="file:///genesys/vwra/audiofile/dtmf_1.vox"/>
      </if>
    </filled>
  </record>

  <record name="DTMF_Second" Finalsilence="1s" dtmfterm="true">
    <filled>
      <if cond="(DTMF_Second$.duration - 1000) &lt; DTMF_Second_Lower || (DTMF_Second$.duration - 1000) &gt; DTMF_Second_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: DTMF Second Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="DTMF_Second_Lower"/> to <value expr="DTMF_Second_Upper"/>; Actual: <value expr="(DTMF_Second$.duration - 1000)"/> </log>
        <exit/>
        <else/>
        <audio src="file:///genesys/vwra/audiofile/dtmf_1.vox"/>
        <audio src="file:///genesys/vwra/audiofile/dtmf_2.vox"/>
        <audio src="file:///genesys/vwra/audiofile/dtmf_6.vox"/>
        <audio src="file:///genesys/vwra/audiofile/dtmf_pound.vox"/>
      </if>
    </filled>
  </record>


  <field name="dtmfInput">
    <property name="inputmodes" value="dtmf" />

    <grammar src="builtin:dtmf/digits?minlength=1;maxlength=3" mode="dtmf"/>
            <filled>
        <assign name="dtmf_reply" expr="dtmfInput"/>
        <if cond="dtmf_reply.length==3 &amp;&amp; dtmf_reply.charAt(0)=='1' &amp;&amp; dtmf_reply.charAt(1)=='2' &amp;&amp; dtmf_reply.charAt(2)=='6'">
          <log gvp:dest="<?php echo $log; ?>"> DTMF Recognition Test Passed </log>
          <audio src="file:///genesys/vwra/audiofile/silence1000ms.vox"/>
          <clear/>
          <goto next="#speech"/>
        <else/>
          <throw event="nomatch"/>
        </if>
            </filled>

      <noinput>
        <log gvp:dest="<?php echo $log; ?>"> Error: No Input; Context: DTMF Recognition Test  </log>
        <exit/>
            </noinput>
            <nomatch>
        <log gvp:dest="<?php echo $log; ?>"> Error: No Match; Context: DTMF Recognition Test </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected 126 but received <value expr="dtmf_reply"/>  </log>
        <exit/>
            </nomatch>

        </field>

    </form>



<form id="speech">

  <catch event="connection.disconnect.hangup">
        <log gvp:dest="<?php echo $log; ?>"> Error: Call Disconnected </log>
  </catch>

  <block>
    <log gvp:dest="<?php echo $log; ?>"> Begin Speech Resource Test </log>
  </block>

  <record name="Main_Menu" Finalsilence="1s">
    <filled>
      <if cond="(Main_Menu$.duration - 1000) &lt; Main_Menu_Lower || (Main_Menu$.duration - 1000) &gt; Main_Menu_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: Main Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="Main_Menu_Lower"/> to <value expr="Main_Menu_Upper"/>; Actual: <value expr="(Main_Menu$.duration - 1000)"/> </log>
        <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(Main_Menu$.duration - 1000)"/>; Context: Main Menu </log>
        <audio src="file:///genesys/vwra/audiofile/dtmf_2.vox"/>
      </if>
    </filled>
  </record>

  <record name="Speech_First" Finalsilence="1s">
    <filled>
      <if cond="(Speech_First$.duration - 1000) &lt; Speech_First_Lower || (Speech_First$.duration - 1000) &gt; Speech_First_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: Speech First Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="Speech_First_Lower"/> to <value expr="Speech_First_Upper"/>; Actual: <value expr="(Speech_First$.duration - 1000)"/> </log>
        <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(Speech_First$.duration - 1000)"/>; Context: Speech First Menu </log>
        <audio src="file:///genesys/vwra/audiofile/dtmf_1.vox"/>
      </if>
    </filled>
  </record>

  <record name="Speech_Second" Finalsilence="1s">
    <filled>
      <if cond="(Speech_Second$.duration - 1000) &lt; Speech_Second_Lower || (Speech_Second$.duration - 1000) &gt; Speech_Second_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: Speech Second Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="Speech_Second_Lower"/> to <value expr="Speech_Second_Upper"/>; Actual: <value expr="(Speech_Second$.duration - 1000)"/> </log>
        <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(Speech_Second$.duration - 1000)"/>; Context: Speech Second Menu </log>
        <prompt>
          five three eight zero
        </prompt>
        </if>
    </filled>
  </record>

  <field name="dtmfInput">

  <grammar src="builtin:dtmf/digits?minlength=1;maxlength=4" mode="dtmf"/>
    <filled>
      <assign name="speech_reply" expr="dtmfInput"/>
                <if cond="speech_reply.length==4 &amp;&amp; speech_reply.charAt(0)=='5' &amp;&amp; speech_reply.charAt(1)=='3' &amp;&amp; speech_reply.charAt(2)=='8' &amp;&amp; speech_reply.charAt(3)=='0'">
          <log gvp:dest="<?php echo $log; ?>"> Speech Resource Test Passed </log>
          <clear/>
          <goto next="#tts"/>
        <else/>
          <throw event="nomatch"/>
                </if>
            </filled>


      <noinput>
        <log gvp:dest="<?php echo $log; ?>"> Error: No Input; Context: Speech Resource Test  </log>
                <exit/>
            </noinput>
            <nomatch>
        <log gvp:dest="<?php echo $log; ?>"> Error: No Match; Context: Speech Resource Test  </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected 5380 but received <value expr="speech_reply"/>  </log>
                <exit/>
            </nomatch>


        </field>

</form>

<form id="tts">

  <catch event="connection.disconnect.hangup">
        <log gvp:dest="<?php echo $log; ?>"> Error: Call Disconnected </log>
  </catch>

  <block>
    <log gvp:dest="<?php echo $log; ?>"> Begin TTS Test </log>
  </block>

  <record name="Main_Menu" Finalsilence="1s">
    <filled>
      <if cond="(Main_Menu$.duration - 1000) &lt; Main_Menu_Lower || (Main_Menu$.duration - 1000) &gt; Main_Menu_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: Main Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="Main_Menu_Lower"/> to <value expr="Main_Menu_Upper"/>; Actual: <value expr="(Main_Menu$.duration - 1000)"/> </log>
        <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(Main_Menu$.duration - 1000)"/>; Context: Main Menu </log>
        <audio src="file:///genesys/vwra/audiofile/dtmf_2.vox"/>
      </if>
    </filled>
  </record>

  <record name="TTS_First" Finalsilence="1s">
    <filled>
      <if cond="(TTS_First$.duration - 1000) &lt; TTS_First_Lower || (TTS_First$.duration - 1000) &gt; TTS_First_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: TTS First Menu </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="TTS_First_Lower"/> to <value expr="TTS_First_Upper"/>; Actual: <value expr="(TTS_First$.duration - 1000)"/> </log>
          <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(TTS_First$.duration - 1000)"/>; Context: TTS First Menu </log>
        <audio src="file:///genesys/vwra/audiofile/dtmf_2.vox"/>
      </if>
    </filled>
  </record>


  <record name="TTS_Reply" Finalsilence="1s">
    <filled>
      <if cond="(TTS_Reply$.duration - 1000) &lt; TTS_Reply_Lower || (TTS_Reply$.duration - 1000) &gt; TTS_Reply_Upper">
        <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: TTS Test </log>
        <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="TTS_Reply_Lower"/> to <value expr="TTS_Reply_Upper"/>; Actual: <value expr="(TTS_Reply$.duration - 1000)"/> </log>
        <exit/>
      <else/>
        <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(TTS_Reply$.duration - 1000)"/>; Context: TTS Reply </log>
        <log gvp:dest="<?php echo $log; ?>"> TTS Test Passed </log>
        <goto next="#disconnect"/>
      </if>
    </filled>
  </record>

</form>

<form id="disconnect">

  <block>
    <log gvp:dest="<?php echo $log; ?>"> Begin to Disconnect </log>
    <audio src="file:///genesys/vwra/audiofile/dtmf_3.vox"/>
  </block>

    <record name="Disconnect" Finalsilence="0.1s">
      <filled>
        <if cond="(Disconnect$.duration - 100) &lt; Disconnect_Lower || (Disconnect$.duration - 100) &gt; Disconnect_Upper">
          <log gvp:dest="<?php echo $log; ?>"> Error: Prompt Duration not in Range; Context: Disconnect </log>
          <log gvp:dest="<?php echo $log; ?>"> Expected Range: <value expr="Disconnect_Lower"/> to <value expr="Disconnect_Upper"/>; Actual: <value expr="(Disconnect$.duration - 100)"/> </log>
          <exit/>
        <else/>
          <log gvp:dest="<?php echo $log; ?>"> Prompt Duration is: <value expr="(Disconnect$.duration - 100)"/>; Context: Disconnect </log>
          <log gvp:dest="<?php echo $log; ?>"> VWRA Test Finished </log>
        </if>
      </filled>
        </record>



   </form>

</vxml>


